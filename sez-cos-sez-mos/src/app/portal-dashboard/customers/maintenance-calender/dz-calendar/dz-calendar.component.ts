import { Component, OnInit } from '@angular/core';
import {ColorUtils} from "../../../../common/ColorUtils";
import * as moment from "moment";
import {NotificationService} from "../../../../services/notification.service";
import {Router} from "@angular/router";
import {AuthHolderService} from "../../../../services/auth-holder.service";
import {Permission} from "../../../../models/permission.model";
import { range as _range,
        sortBy as _sortBy,
        flatMap as _flatMap} from "lodash";
import {
    Observable, 
    zip,
    empty
} from "rxjs";
import { map } from 'rxjs/operators';
import {MaintenanceService} from "../../../../services/maintenance.service";
import {CalendarEvent} from "../../../../models/calendar-event.model";
import {MaintenanceEventWithLocalDates} from "../../../../models/maintenance-event.model";
import {DateUtils} from "../../../../common/date-utils";
@Component({
  selector: 'dz-calendar',
  templateUrl: './dz-calendar.component.html',
  // styleUrls: ['./dz-calendar.component.scss']
  styleUrls: ["./calender.scss"]
})
export class DzCalendarComponent implements OnInit {
  Permission = Permission;

    firstDayOfMonth = moment().startOf("day").date(1);
    days: Array<moment.Moment>;
    rows: Array<Row>;
    currentDate = Date.now();

    constructor(
         public auth: AuthHolderService,
                private notificationService: NotificationService,
                private maintenanceService: MaintenanceService,
                private router: Router) {
    }

    ngOnInit() {
        //this.maintenanceService.updates.subscribe(() => this.refresh());
        this.refresh();
    }

    dayNames() {
        return moment.weekdaysShort();
    }

    nextMonth() {
        this.firstDayOfMonth.add(1, "month");
        this.refresh();
    }

    previousMonth() {
        this.firstDayOfMonth.subtract(1, "month");
        this.refresh();
    }

    getDays(row: number) {
        return this.days.slice(row * 7, (row + 1) * 7);
    }

    isToday(day: moment.Moment) {
        return day.isSame(this.currentDate, "day");
    }

    addEvent() {
        this.router.navigate(["/console/notifications"], {queryParams: {"new": true}});
    }

    getUtcStartDate(maintenanceEvent: MaintenanceEventWithLocalDates): string {
        return DateUtils.formatDateUTC(maintenanceEvent.startDateTime);
    }

    private refresh() {
        this.refreshCalendar();
        this.getCalendarEvents().subscribe(calendarEvents => this.refreshEvents(calendarEvents));
    }

    private startDate(): moment.Moment {
        return moment(this.firstDayOfMonth).startOf("week");
    }

    private endDate(): moment.Moment {
        return moment(this.firstDayOfMonth).endOf("month").endOf("week");
    }

    private dayCount(): number {
        return this.endDate().diff(this.startDate(), "days") + 1;
    }

    private refreshCalendar() {
        const startDate = this.startDate();
        const dayCount = this.dayCount();
        this.days = _range(0, dayCount).map(dayNumber => moment(startDate).add(dayNumber, "day"));
        this.rows = _range(0, dayCount / 7).map(() => new Row());
    }

    private refreshEvents(events: Array<CalendarEvent>) {
        const startOfMonth = moment.utc(this.startDate().format("L"));
        this.rows.forEach((row, i) => {
            const startOfWeek = moment(startOfMonth).add(i * 7, "day");
            const endOfWeek = moment(startOfMonth).add(i * 7 + 6, "day");

            for (const event of events) {
                const startOfEvent = moment.utc(event.startDate).startOf("day");
                const endOfEvent = moment.utc(event.endDate).startOf("day");

                if (this.overlaps(startOfEvent, endOfEvent, startOfWeek, endOfWeek)) {
                    const startOfEventInWeek = startOfWeek.isAfter(startOfEvent)
                        ? startOfWeek
                        : startOfEvent;
                    const endOfEventInWeek = endOfWeek.isBefore(endOfEvent)
                        ? endOfWeek
                        : endOfEvent;
                    const startOfEventWeekday = startOfEventInWeek.diff(startOfWeek, "days");
                    const endOfEventWeekday = endOfEventInWeek.diff(startOfWeek, "days");
                    row.addEvent(startOfEventWeekday, endOfEventWeekday, event);
                }
            }
        });
    }

    private overlaps(startA: moment.Moment, endA: moment.Moment, startB: moment.Moment, endB: moment.Moment): boolean {
        return startA.isSameOrBefore(endB, "day") && endA.isSameOrAfter(startB, "day");
    }

    getColor(event: CalendarEvent): string {
        if (event !== undefined) {
            return this.isChangeFreeze(event) ? 'bgm-black' : this.isMaintenance(event)
                ? ColorUtils.getColorCodeById(Math.trunc(event.id + ColorUtils.getColorsCount() / 2))
                : ColorUtils.getColorCodeById(event.id)
        } else {
            return "";
        }
    }

    isMaintenance(event: CalendarEvent): boolean {
        return (<any>event).reminder !== undefined
    }

    isChangeFreeze(event: CalendarEvent): boolean {
        return event.type == MaintenanceService.MaintenanceType.CHANGE_FREEZE
    }

    private getCalendarEvents(): Observable<CalendarEvent[]> {
        let eventsObs: Observable<CalendarEvent[]>;

        if (this.auth.hasPermission(Permission.VIEW_NOTIFICATIONS) && this.auth.hasPermission(Permission.VIEW_MAINTENANCE_EVENTS)) {
            eventsObs = zip(
                this.notificationService.getActualNotifications(this.startDate(), this.endDate()),
                this.maintenanceService.getActualMaintenanceEvents(this.startDate(), this.endDate())
            ).pipe(map(events => _flatMap(events)));
        } else if (this.auth.hasPermission(Permission.VIEW_NOTIFICATIONS)) {
            eventsObs = this.notificationService.getActualNotifications(this.startDate(), this.endDate());
        } else if (this.auth.hasPermission(Permission.VIEW_MAINTENANCE_EVENTS)) {
            eventsObs = this.maintenanceService.getActualMaintenanceEvents(this.startDate(), this.endDate());
        } else {
            eventsObs = empty();
        }
        return eventsObs.pipe(map(events => _sortBy(events, event => moment(event.startDate))));
    }
}

export class Row {
    eventRows: Array<EventRow> = [];

    addEvent(from: number, to: number, event: CalendarEvent) {
        let added = false;
        for (let eventRow of this.eventRows) {
            if (eventRow.canAdd(from, to) && !added) {
                eventRow.addEvent(from, to, event);
                added = true;
            }
        }
        if (!added) {
            let eventRow = new EventRow();
            eventRow.addEvent(from, to, event);
            this.eventRows.push(eventRow);
        }
    }
}

export class EventRow {
    eventContainers: Array<EventContainer> = [];
    length = 0;

    addEvent(from: number, to: number, event: CalendarEvent) {
        while (this.length < from) {
            this.addEmpty();
        }
        this.eventContainers.push(new EventContainer(from, to, event));
        this.length += to - from + 1;
    }

    addEmpty() {
        this.eventContainers.push(new EventContainer(this.length, this.length));
        this.length++;
    }

    canAdd(from: number, to: number): boolean {
        for (let eventContainer of this.eventContainers) {
            if (eventContainer.event && !(from > eventContainer.to || to < eventContainer.from)) {
                return false;
            }
        }
        return true;
    }
}

export class EventContainer {
    colspan;

    constructor(public from: number, public to: number, public event?: CalendarEvent) {
        this.colspan = to - from + 1;
    }
}






 

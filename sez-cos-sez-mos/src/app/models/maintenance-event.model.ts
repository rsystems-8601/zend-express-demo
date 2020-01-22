import {Organization} from "./organization.model";
import {CalendarEvent} from "./calendar-event.model";
import {ShortUserInfo, User} from "./user.model";
import {PermissionsModel} from "./permissions-bearer.model";
import * as moment from "moment";
import {DateUtils} from "../common/date-utils";
import {assign as _assign} from "lodash";

export class MaintenanceEvent extends PermissionsModel {

    constructor(public type?: string,
                public title?: string,
                public message?: string,
                public startDateTime?: string,
                public endDateTime?: string,
                public reminder = false,
                public id?: number,
                public organizations?: Organization[],
                public approvalStatus?: string,
                public approvals?: MaintenanceEventApproval[],
                public approvalTicketId?: number,
                public crefAttachment?: File[],
                public cron?: string,
                public repeatUntil?: string,
                public progressStatus?: string,
                public progressTicketIdsByOrganizationId?: { [organizationId: string]: number },
                public severity?: string,
                public recurring?: boolean,
                public timezoneOffset?: string,
                public firstInstanceStartDateTime?: string,
                public assignedUser?: ShortUserInfo,
                public approvers?: User[],
                public inactiveDate?: string) {
        super();
    }
}

export class MaintenanceEventWithLocalDates extends MaintenanceEvent implements CalendarEvent {
    static from(job: MaintenanceEvent): MaintenanceEventWithLocalDates {
        // use the offset of the first instance to discard the daylight saving time shift
        const originalOffset = DateUtils.getTimezoneOffset(job.firstInstanceStartDateTime);
        return _assign(job, {
            startDate: DateUtils.formatDate(moment(job.startDateTime).utcOffset(originalOffset)),
            endDate: DateUtils.formatDate(moment(job.endDateTime).utcOffset(originalOffset))
        })
    }
}

export class MaintenanceEventWithRecurrencePatterns extends MaintenanceEvent {
    availableCrons: CronCollection;
    getCronDescription: () => string;
    getRecurrenceDate: () => number;

    static from(job: MaintenanceEvent): MaintenanceEventWithRecurrencePatterns {
        const firstInstanceStartDateWithOriginalOffset = moment(job.firstInstanceStartDateTime).utcOffset(job.timezoneOffset);
        const jobWithPattern = <MaintenanceEventWithRecurrencePatterns>job;
        // jobWithPattern.availableCrons = new CronCollection(DateUtils.formatDateTime(firstInstanceStartDateWithOriginalOffset), job.timezoneOffset); // FIXME date time string does not include offset
        jobWithPattern.availableCrons = new CronCollection(job.firstInstanceStartDateTime, job.timezoneOffset);
        jobWithPattern.getCronDescription = () => jobWithPattern.availableCrons.getDescription(job.cron);
        jobWithPattern.getRecurrenceDate = () => moment(job.startDateTime).date();
        return jobWithPattern;
    }
}

export interface MaintenanceEventApproval {
    user: ShortUserInfo;
    approved: boolean;
}

export class Cron {
    second: string;
    minute: string;
    hour: string;
    day: string;
    month: string;
    weekday: string;

    private static toString(cron: Cron): string {
        return [cron.second, cron.minute, cron.hour, cron.day, cron.month, cron.weekday].join(" ");
    }

    static daily(minute: number, hour: number): string {
        return Cron.toString({
            second: "0",
            minute: minute.toString(),
            hour: hour.toString(),
            day: "*",
            month: "*",
            weekday: "?"
        });
    }

    static everyWeekday(minute: number, hour: number, weekday: number): string {
        return Cron.toString({
            second: "0",
            minute: minute.toString(),
            hour: hour.toString(),
            day: "?",
            month: "*",
            weekday: weekday.toString()
        });
    }

    static monthly(minute: number, hour: number, dayOfMonth: number | "L"): string {
        return Cron.toString({
            second: "0",
            minute: minute.toString(),
            hour: hour.toString(),
            day: dayOfMonth.toString(),
            month: "*",
            weekday: "?"
        });
    }

    static quarterly(minute: number, hour: number, monthZeroBased: number, dayOfMonth: number): string {
        const startingMonthOneBased = (monthZeroBased % 3) + 1;
        return Cron.toString({
            second: "0",
            minute: minute.toString(),
            hour: hour.toString(),
            day: dayOfMonth.toString(),
            month: startingMonthOneBased + "/3",
            weekday: "?"
        });
    }

    static nthWeekdayMonthly(minute: number, hour: number, weekday: number, weekdayNumber: number | "L"): string {
        return Cron.toString({
            second: "0",
            minute: minute.toString(),
            hour: hour.toString(),
            day: "?",
            month: "*",
            weekday: weekdayNumber === "L"
                ? weekday + weekdayNumber
                : weekday + "#" + weekdayNumber
        });
    }

    static nthWeekdayQuarterly(minute: number, hour: number, monthZeroBased: number, weekday: number, weekdayNumber: number | "L"): string {
        const startingMonthOneBased = (monthZeroBased % 3) + 1;
        return Cron.toString({
            second: "0",
            minute: minute.toString(),
            hour: hour.toString(),
            day: "?",
            month: startingMonthOneBased + "/3",
            weekday: weekdayNumber === "L"
                ? weekday + weekdayNumber
                : weekday + "#" + weekdayNumber
        });
    }
}

export class CronCollection {
    static readonly NEVER = "never";

    // Using maps instead of plain objects to support "never" cron with undefined value
    private cronsByDescription: Map<string, string>;
    private descriptionsByCron: Map<string, string>;

    constructor(isoDateTime: string, timezoneOffset?: string) {

        const startDate = moment(isoDateTime);
        const month = startDate.month();
        const dayOfMonth = startDate.date();
        const weekday = startDate.isoWeekday();
        const alignedWeek = Math.ceil(dayOfMonth / 7);
        const minute = startDate.minute();
        const hour = startDate.hour();

        const offsetDate = timezoneOffset ? moment(isoDateTime).utcOffset(timezoneOffset) : startDate;
        const offsetMonth = offsetDate.month();
        const offsetDayOfMonth = offsetDate.date();
        const offsetWeekday = offsetDate.isoWeekday();
        const offsetAlignedWeek =  Math.ceil(offsetDayOfMonth / 7);
        const offsetMinute = offsetDate.minute();
        const offsetHour = offsetDate.hour();

        const crons = new Map<string, string>([
            ["never", undefined],
            ["daily", Cron.daily(minute, hour)],
            ["monthly", Cron.monthly(minute, hour, dayOfMonth)],
            ["quarterly", Cron.quarterly(minute, hour, month, dayOfMonth)],
            [`everyWeekday${weekday}`, Cron.everyWeekday(minute, hour, weekday)],
        ]);
        if (alignedWeek <= 4) {
            if (weekday !== offsetWeekday || alignedWeek !== offsetAlignedWeek || hour !== offsetHour || minute !== offsetMinute) {
                crons.set(`every${alignedWeek}WeekdayOfMonth${weekday}`, Cron.nthWeekdayMonthly(offsetMinute, offsetHour, offsetWeekday, offsetAlignedWeek));
                crons.set(`every${alignedWeek}WeekdayQuarterly${weekday}`, Cron.nthWeekdayQuarterly(offsetMinute, offsetHour, offsetMonth, offsetWeekday, offsetAlignedWeek));
            } else {
                crons.set(`every${alignedWeek}WeekdayOfMonth${weekday}`, Cron.nthWeekdayMonthly(minute, hour, weekday, alignedWeek));
                crons.set(`every${alignedWeek}WeekdayQuarterly${weekday}`, Cron.nthWeekdayQuarterly(minute, hour, month, weekday, alignedWeek));
            }
        }
        if (dayOfMonth + 7 > startDate.daysInMonth()) {
            if (weekday !== offsetWeekday || alignedWeek !== offsetAlignedWeek || hour !== offsetHour || minute !== offsetMinute) {
                crons.set("everyLastWeekdayOfMonth" + weekday, Cron.nthWeekdayMonthly(offsetMinute, offsetHour, offsetWeekday, "L"));
                crons.set(`everyLastWeekdayQuarterly${weekday}`, Cron.nthWeekdayQuarterly(offsetMinute, offsetHour, offsetMonth, offsetWeekday, "L"));
            } else {
                crons.set("everyLastWeekdayOfMonth" + weekday, Cron.nthWeekdayMonthly(minute, hour, weekday, "L"));
                crons.set(`everyLastWeekdayQuarterly${weekday}`, Cron.nthWeekdayQuarterly(minute, hour, month, weekday, "L"));
            }
        }

        const lastDayOfMonth = startDate.clone().endOf("month").date();
        if (dayOfMonth === lastDayOfMonth) {
            crons.set("everyLastDayOfMonth", Cron.monthly(minute, hour, "L"));
        }
        this.cronsByDescription = crons;
        this.descriptionsByCron = new Map<string, string>();
        crons.forEach((cron, description) => this.descriptionsByCron.set(cron, description));
    }

    getCron(name: string): string {
        return this.cronsByDescription.get(name);
    }

    getDescription(cron: string): string {
        return this.descriptionsByCron.get(cron);
    }

    getDescriptions(): string[] {
        return Array.from(this.cronsByDescription.keys());
    }
}

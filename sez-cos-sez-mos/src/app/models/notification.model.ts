import {Organization} from "./organization.model";
import {CalendarEvent} from "./calendar-event.model";

export class Notification implements CalendarEvent {

    constructor(public title?: string,
                public message?: string,
                public startDate?: string,
                public endDate?: string,
                public id?: number,
                public organizations?: Organization[]) {
    }
}
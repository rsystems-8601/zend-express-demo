import * as moment from "moment-timezone";
import {Moment} from "moment";
import {MatDatetimeFormats} from "@mat-datetimepicker/core";

export class DateUtils {
    static readonly ISO_DATE_FORMAT = "YYYY-MM-DD";
    static readonly DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm";
    static readonly TIME_FORMAT = "HH:mm";

    static readonly DATEPICKER_FORMATS: MatDatetimeFormats = {
        parse: {
            dateInput: DateUtils.DATE_TIME_FORMAT,
        },
        display: {
            dateInput: DateUtils.ISO_DATE_FORMAT,
            monthInput: "MMM",
            timeInput: "HH:mm",
            datetimeInput: DateUtils.DATE_TIME_FORMAT,
            monthYearLabel: 'MMM YYYY',
            dateA11yLabel: DateUtils.ISO_DATE_FORMAT,
            monthYearA11yLabel: "MMMM YYYY",
            popupHeaderDateLabel: "ddd, DD MMM"  // this one is new field added into date format
        }
    };

    static formatDate(date: Date | Moment | string): string {
        return date && moment(date).format(this.ISO_DATE_FORMAT);
    }

    static formatDateUTC(date: Date | Moment | string): string {
        return date && moment(date).utc().format(this.ISO_DATE_FORMAT);
    }

    static formatDateTime(date: Date | Moment | string, timeZone: boolean = false): string {
        if (!date) { return ''; }
        let dateTime = date && moment(date).format(this.DATE_TIME_FORMAT);
        return timeZone
            ? `${dateTime} ${this.getTimeZoneShort()}`
            : dateTime;
    }

    static formatTime(date: Date | Moment | string): string {
        return date && moment(date).format(this.TIME_FORMAT);
    }

    static getTimeZoneShort(): string {
        return moment.tz(moment.tz.guess()).zoneAbbr();
    }

    static getTimezoneOffset(date: Moment | string): string {
        return date && moment(date).format('Z');
    }
}

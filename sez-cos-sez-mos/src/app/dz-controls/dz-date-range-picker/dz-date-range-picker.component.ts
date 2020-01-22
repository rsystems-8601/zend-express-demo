import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import * as moment from "moment";
import {TextMaskUtils} from "../../common/text-mask-utils";
import {DateUtils} from "../../common/date-utils";

@Component({
    selector: "dz-date-range-picker",
    templateUrl: "./dz-date-range-picker.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DzDateRangePickerComponent {

    @ViewChild("dropdownMenu", {static: false}) dropdownMenu: ElementRef;

    @Input() startDate: Date;
    @Input() endDate: Date;
    @Output() startDateChange = new EventEmitter<Date>();
    @Output() endDateChange = new EventEmitter<Date>();

    mask = TextMaskUtils.DATE_MASK;
    opened = false;

    formattedStartDate: string;
    formattedEndDate: string;

    constructor() {
        window.document.addEventListener('click', (event: any) => {
            if (!this.dropdownMenu.nativeElement.contains(event.target) &&
                !event.target.attributes.hasOwnProperty("dropdownToggle")) {
                this.close();
            }
        }, true);
    }

    formatDate(date: Date) {
        return date
            ? DateUtils.formatDate(date)
            : "_";
    }

    setFormattedStart(dateString: string) {
        if (!isNaN(Date.parse(dateString))) {
            this.formattedStartDate = dateString;
            this.startDate = moment(dateString).toDate();
        } else {
            this.formattedStartDate = "";
            this.endDate = undefined;
        }
        this.startDateChange.emit(this.startDate);
    }

    setFormattedEnd(dateString: string) {
        if (!isNaN(Date.parse(dateString))) {
            this.formattedEndDate = dateString;
            this.endDate = moment(dateString).toDate();
        } else {
            this.formattedEndDate = "";
            this.endDate = undefined;
        }
        this.endDateChange.emit(this.endDate);
    }

    close() {
        this.opened = false;
    }
}

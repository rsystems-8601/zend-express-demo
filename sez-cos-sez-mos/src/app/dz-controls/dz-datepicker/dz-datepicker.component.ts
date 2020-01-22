import {Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as moment from "moment";
import {FormService} from "../../services/form.service";
import {DateUtils} from "../../common/date-utils";
import {TextMaskUtils} from "../../common/text-mask-utils";

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DzDatepickerComponent),
    multi: true
};

@Component({
    selector: "dz-datepicker",
    templateUrl: "./dz-datepicker.component.html",
    providers: [VALUE_ACCESSOR]
})
export class DzDatepickerComponent implements ControlValueAccessor {

    @Input() ngFormControl;
    @Input() placeholder: string = "";
    @Input() showTime: boolean;
    @Output() dateChange = new EventEmitter<string>();

    @ViewChild("dropdownMenu", {static: false}) dropdownMenu: ElementRef;

    mask: Mask;
    disabled = false;
    opened = false;
    timezone = DateUtils.getTimeZoneShort();
    formattedDate: string;
    datepickerModel: Date;
    timepickerModel: Date;
    onChange = (formattedDate: string) => {
        this.dateChange.emit(formattedDate);
    };
    onTouched = () => {
        return;
    };

    constructor(private formService: FormService) {
        window.document.addEventListener('click', (event: any) => {
            if (!this.dropdownMenu.nativeElement.contains(event.target) && this.opened) {
                this.close();
            }
        }, true);
    }

    ngOnInit(): void {
        this.mask = this.showTime
            ? TextMaskUtils.DATE_TIME_MASK
            : TextMaskUtils.DATE_MASK
    }

    formatDate(date: Date): string {
        return this.showTime
            ? DateUtils.formatDateTime(date)
            : DateUtils.formatDate(date);
    }

    writeValue(formattedDate: string) {
        const millis = Date.parse(formattedDate);
        if (!isNaN(millis)) {
            this.formattedDate = formattedDate;
            this.datepickerModel = new Date(millis);
            this.timepickerModel = new Date(millis);
        }
    }

    resetTime() {
        this.timepickerModel = moment().startOf("day").toDate();
    }

    refreshFormattedDateTime() {
        this.formattedDate = this.formatDate(this.getSelectedDateTime());
    }

    registerOnChange(fn: any): void {
        this.onChange = (formattedDate: string) => {
            this.dateChange.emit(formattedDate);
            fn(formattedDate);
        };
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    isValid(): boolean {
        return this.ngFormControl ? !this.formService.hasControlError(this.ngFormControl) : true;
    }

    close(): void {
        this.opened = false;
        this.onChange(this.formattedDate);
    }

    toggleDropdown() {
        if (!this.disabled) {
            (this.opened = !this.opened);
        }
    }

    private getSelectedDateTime(): Date {
        const date = this.datepickerModel || new Date();
        const time = this.timepickerModel || moment().startOf("day").toDate();
        return !this.showTime
            ? date
            : new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                time.getHours(),
                time.getMinutes()
            );
    }
}

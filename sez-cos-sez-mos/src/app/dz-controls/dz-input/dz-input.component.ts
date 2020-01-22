import {Component, EventEmitter, forwardRef, Input, Output} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FormService} from "../../services/form.service";
import {trim as _trim} from "lodash";
import {TextMaskUtils} from "../../common/text-mask-utils";

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DzInputComponent),
    multi: true
};

@Component({
    selector: "dz-input",
    templateUrl: "./dz-input.component.html",
    providers: [VALUE_ACCESSOR]
})

export class DzInputComponent implements ControlValueAccessor {  
    @Input() mask: Mask;
    @Input() ngFormControl;
    @Input() placeholder: string;
    @Input() type = "text";
    @Input() min: number;
    @Input() autofocus = false;
    @Output() onInput: EventEmitter<string> = new EventEmitter<string>();
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();
    value: string;
    disabled = false;
    onChange = (value: string) => {
        return;
    };
    onTouched = () => {
        return;
    };

    constructor(private formService: FormService) {
    }

    onBlurAction(event) {
        this.blur.emit(event);
        this.onTouched();
    }

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    onNgModelChange(value: string) {
        value = _trim(value);
        value = this.mask ? TextMaskUtils.cleanMask(value) : value;
        this.onChange(value);
        this.onInput.emit(value);
    }

    isValid(): boolean {
        return this.ngFormControl ? !this.formService.hasControlError(this.ngFormControl) : true;
    }
}
import {Component, EventEmitter, forwardRef, Input, Output} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FormService} from "../../services/form.service";
import {IdGenerator} from "../../common/template-utils";

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DzCheckboxComponent),
    multi: true
};

@Component({
    selector: "dz-checkbox",
    templateUrl: "./dz-checkbox.component.html",
    providers: [VALUE_ACCESSOR]
})

export class DzCheckboxComponent implements ControlValueAccessor {
    inputElementId = IdGenerator.getId();

    @Input() ngFormControl;
    @Input() placeholder: string;
    @Input() type = 0;
    @Output() onToggle: EventEmitter<any> = new EventEmitter();
    disabled = false;
    value = false;
    onChange = (value: boolean) => {
        return;
    };
    onTouched = () => {
        return;
    };

    constructor(private formService: FormService) {
    }

    writeValue(value: boolean): void {
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

    onNgModelChange(value: boolean) {
        this.onChange(value);
        this.onToggle.emit(value);
    }

    isValid(): boolean {
        return this.ngFormControl ? !this.formService.hasControlError(this.ngFormControl) : true;
    }
}
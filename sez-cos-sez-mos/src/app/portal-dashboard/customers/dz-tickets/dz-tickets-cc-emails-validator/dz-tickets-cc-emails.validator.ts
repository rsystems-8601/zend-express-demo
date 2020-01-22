import {AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";
import {Directive} from "@angular/core";

@Directive({
    selector: '[ccEmails][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: CcEmailsValidator, multi: true}
    ]
})
export class CcEmailsValidator implements Validator {
    validator: ValidatorFn;

    constructor() {
        this.validator = (c: AbstractControl) => {
            if (!c.value) {
                return null;
            }
            let isValid = c.value.split(',').length === (c.value.match(/@/g) || []).length;

            if (isValid) {
                return null;
            } else {
                return {
                    ccEmails: {
                        valid: false
                    }
                };
            }
        }
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}
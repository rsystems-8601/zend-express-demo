import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {isEmpty as _isEmpty} from "lodash";
import * as moment from "moment";
import StartOf = moment.unitOfTime.StartOf;

export class DzValidators {

    static asyncUnique(isValueUnique: (value: any) => Observable<boolean>, currentValue: string): AsyncValidatorFn {
        return (control: AbstractControl) => isValueUnique(control.value)
            .pipe(map(unique => unique || currentValue === control.value ? null : {duplicate: true}))
            .toPromise();
    }

    static notEmpty(): ValidatorFn {
        return (control: AbstractControl) => _isEmpty(control.value) ? null : {"valid": false};
    }

    static predicate(predicate: (value: any) => boolean): ValidatorFn {
        return (control: AbstractControl) => predicate(control.value) ? null : {"valid": false};
    }

    static dateIsSameOrBefore(endDateFn: () => string) {
        return DzValidators.predicate((startDate: string) => {
            let endDate = endDateFn();
            if (!startDate || !endDate) {
                return true;
            }
            return moment(startDate).isSameOrBefore(moment(endDate));
        });
    }

    static dateIsSameOrAfter(startDateFn: () => string) {
        return DzValidators.predicate((endDate: string) => {
            let startDate = startDateFn();
            if (!startDate || !endDate) {
                return true;
            }
            return moment(endDate).isSameOrAfter(moment(startDate));
        });
    }

    static dateIsAfter(startDateFn: () => string) {
        return DzValidators.predicate((endDate: string) => {
            let startDate = startDateFn();
            if (!startDate || !endDate) {
                return true;
            }
            return moment(endDate).isAfter(moment(startDate), "day");
        });
    }

    static matchingPasswords(password: AbstractControl, password2: AbstractControl) {
        if (password2.hasError('notEquivalent')) {
            password2.setErrors(null);
        }

        if (password.value && password2.value && (password.value !== password2.value)) {
            password2.setErrors({"notEquivalent": true});
        }
    }

    static passwordStrength(control: AbstractControl) {
        const value = control.value;

        const lowerLetters = /[a-z]+/.test(value);
        const upperLetters = /[A-Z]+/.test(value);
        const numbers = /[0-9]+/.test(value);

        if (value && (value.length < 6 || !lowerLetters || !upperLetters || !numbers)) {
            return {"passwordStrength": true};
        }
    }

    static validateDateRange(startDateCtrl: AbstractControl, endDateCtrl: AbstractControl,
                             config?: { errorKey?: string, exclusive?: boolean, granularity?: StartOf }): ValidationErrors {
        let startDate = startDateCtrl.value && moment(startDateCtrl.value);
        let endDate = endDateCtrl.value && moment(endDateCtrl.value);
        let errorKey = config && config.errorKey || "invalidDateRange";
        let exclusive = config && config.exclusive;
        let granularity = config && config.granularity || "day";

        if (startDate && endDate && (exclusive ? startDate.isBefore(endDate, granularity) : startDate.isSameOrBefore(endDate, granularity))) {
            startDateCtrl.setErrors(null);
            endDateCtrl.setErrors(null);
        } else if (startDate && endDate) {
            startDateCtrl.setErrors({[errorKey]: true});
            endDateCtrl.setErrors({[errorKey]: true});
        }
        return null;
    }

}
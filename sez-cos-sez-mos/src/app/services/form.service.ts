import {Injectable} from "@angular/core";
import {AbstractControl, FormGroup, NgForm, NgModel} from "@angular/forms";

@Injectable({
    providedIn:"root"
})
export class FormService {

    validate(form: FormGroup | NgForm) {
        const controls = form.controls;
        Object.keys(controls).forEach((key) => controls[key].markAsTouched());
        return form.valid;
    }

    hasControlError(control: AbstractControl | NgModel): boolean {
        return !control.valid && control.touched && !control.disabled;
    }
}
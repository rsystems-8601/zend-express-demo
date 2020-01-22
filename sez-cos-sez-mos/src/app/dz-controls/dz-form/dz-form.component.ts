import {
    AfterViewInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild
} from "@angular/core";
import {FormService} from "../../services/form.service";
import {FormGroup, NgForm, NgModel} from "@angular/forms";

@Component({
    selector: "dz-form",
    templateUrl: "./dz-form.component.html"
})
export class DzFormComponent implements AfterViewInit {

    @ContentChildren(NgModel, {descendants: true})
    models: QueryList<NgModel>;

    @ViewChild(NgForm, {static: false})
    ngForm: NgForm;

    @Input()
    formGroup: FormGroup;

    @Output()
    onSubmit = new EventEmitter<any>();

    constructor(private formService: FormService) {
    }

    ngAfterViewInit() {
        if (!this.formGroup) {
            this.setActualControlsToNgForm();
            this.models.changes.subscribe(() => {
                this.setActualControlsToNgForm();
            });
        }
    }

    submit(form: FormGroup | NgForm) {
        const valid = this.formService.validate(form);
        if (valid) {
            this.onSubmit.emit();
        }
    }

    get form(): FormGroup {
        return this.formGroup ? this.formGroup : this.ngForm.form;
    }

    private setActualControlsToNgForm() {
        let ngContentModels = this.models.toArray();
        this.ngForm.control.controls = {};
        ngContentModels.forEach((model) => {
            this.ngForm.addControl(model);
        });
    }
}
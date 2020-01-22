import {
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    QueryList,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import {FormService} from "../../services/form.service";
import {OverlayContainer} from "@angular/cdk/overlay";
import {NgModel} from "@angular/forms";
import { take } from "rxjs/operators";
@Directive({
    selector: "[dzClickToEditContent]"
})
export class DzClickToEditContent {

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef) {
    }

    show() {
        this.viewContainer.createEmbeddedView(this.templateRef);
    }

    hide() {
        this.viewContainer.clear();
    }
}

@Component({
    selector: "dz-click-to-edit",
    templateUrl: "./dz-click-to-edit.component.html"
})
export class DzClickToEditComponent implements AfterViewInit, OnDestroy {

    constructor(private elementRef: ElementRef,
                private overlayContainer: OverlayContainer,
                private formService: FormService) {
    }

    @ContentChild(DzClickToEditContent, {static: false}) content: DzClickToEditContent;
    @ContentChildren(NgModel, {descendants: true}) ngModelQueryList: QueryList<NgModel>;

    @Input() value;
    @Input() readOnly = false;
    @Input() compareWith = (oldVal, newVal) => oldVal === newVal;
    @Output() onUpdate = new EventEmitter<any>();
    ngModel: NgModel;
    isEditState = false;

    private listener;

    ngAfterViewInit(): void {

        let oldValue;

        this.ngModelQueryList.changes.subscribe(queryList => {
            let ngModels = queryList.toArray();
            this.ngModel = ngModels.length && ngModels[0];

            if (this.ngModel) {
                oldValue = this.ngModel.value;
                this.ngModel.valueChanges.pipe(take(1)).subscribe(value => {
                    oldValue = value;
                });
            }
        });

        window.document.addEventListener("click", this.listener = (event: any) => {
            let clickOnOverlay = this.overlayContainer.getContainerElement().contains(event.target);
           // let modalOpened = this.overlayContainer.getContainerElement().querySelector("mat-dialog-container");
            let selectOpened = this.overlayContainer.getContainerElement().querySelector(".mat-select-content");

            if (this.isEditState
                && !this.elementRef.nativeElement.contains(event.target)
                && (!clickOnOverlay /* || modalOpened */)
                && !selectOpened
                && (!this.ngModel || !this.formService.hasControlError(this.ngModel))
            ) {
                if (this.ngModel) {
                    let newValue = this.ngModel.value;
                    if (!this.compareWith(newValue, oldValue)) {
                        oldValue = newValue;
                        this.onUpdate.emit(newValue);
                    }
                }
                this.close();
            }
        }, true);
    }

    ngOnDestroy(): void {
        window.document.removeEventListener("click", this.listener, true);
    }

    switchToEditableState() {
        if (!this.readOnly) {
            this.open();
            setTimeout(() => {
                let input: HTMLInputElement = this.elementRef.nativeElement.querySelector("input, textarea");
                if (input) {
                    input.focus();
                }
            }, 0);
        }
    }

    open() {
        this.isEditState = true;
        this.content.show();
    }

    close() {
        this.isEditState = false;
        this.content.hide();
    }
}
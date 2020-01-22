import {Directive, ElementRef, AfterViewInit, Input} from "@angular/core";

@Directive({
    selector: "[dz-focus]"
})
export class DzFocus implements AfterViewInit {
    @Input("dz-focus") focus: boolean;

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        if (this.focus) {
            setTimeout(() => this.elementRef.nativeElement.focus(), 300);
        }
    }
}
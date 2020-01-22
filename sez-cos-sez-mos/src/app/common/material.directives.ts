import {Directive, ElementRef, OnDestroy, Renderer2, AfterContentInit} from "@angular/core";
const Waves = require("node-waves/dist/waves");

@Directive({
    selector: ".btn"
})
export class Wave {
    constructor(private elementRef: ElementRef) {
        const element = elementRef.nativeElement;
        const elementClasses = element.classList;
        if (elementClasses.contains("btn-icon") || elementClasses.contains("btn-float")) {
            Waves.attach(element, ["waves-circle"]);
        } else if (elementClasses.contains("btn-light")) {
            Waves.attach(element, ["waves-light"]);
        } else {
            Waves.attach(element);
        }

        Waves.init();
    }
}

@Directive({
    selector: ".fg-line"
})
export class FocusedBorder implements AfterContentInit, OnDestroy {

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    }

    private listenerCancels: Function[] = [];

    ngAfterContentInit() {
        const element = this.elementRef.nativeElement;
        const input = element.querySelector("input");
        const select = element.querySelector("select");
        const textarea = element.querySelector("textarea");

        if (input != null) {
            this.addListeners(input, element);
        }
        if (select != null) {
            this.addListeners(select, element);
        }
        if (textarea != null) {
            this.addListeners(textarea, element);
        }
    }

    ngOnDestroy() {
        this.listenerCancels.forEach(f => f());
    }

    private addListeners(selectableElement, lineElement) {
        this.listenerCancels.push(
            this.renderer.listen(selectableElement, "focus", () => {
                lineElement.classList.add("fg-toggled");
            })
        );

        this.listenerCancels.push(
            this.renderer.listen(selectableElement, "blur", () => {
                lineElement.classList.remove("fg-toggled");
            })
        );
    }
}
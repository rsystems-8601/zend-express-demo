import {Component, Input} from "@angular/core";
import {Spinner} from "../spinner";

@Component({
    selector: "[dz-spinner]",
    templateUrl: "./dz-spinner.component.html",
    styleUrls: ["./dz-spinner.component.scss"]
})
export class DzSpinnerComponent {
    Spinner = Spinner;
    @Input("dz-spinner") id: number;
}
import {Component, Input} from "@angular/core";

@Component({
    selector: "[dzNoItems]",
    templateUrl: "./dz-no-items.component.html",
    styleUrls: ["./dz-no-items.component.scss"]
})
export class DzNoItemsComponent {
    @Input("dzNoItems") showNoItems;
    @Input("noItemsMessage") message;
}

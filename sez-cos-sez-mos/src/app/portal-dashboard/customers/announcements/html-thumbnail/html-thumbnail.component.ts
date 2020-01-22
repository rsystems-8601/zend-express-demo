import {Component, Input} from "@angular/core";

@Component({
    selector: 'dz-html-thumbnail',
    templateUrl: './html-thumbnail.component.html',
    styleUrls: ['./html-thumbnail.component.less']
})
export class HtmlThumbnailComponent {
    @Input() content: string;
}

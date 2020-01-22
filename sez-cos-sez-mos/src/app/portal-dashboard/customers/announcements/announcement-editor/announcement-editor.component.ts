import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { Spinner } from 'src/app/common/spinner';
import { Announcement } from 'src/app/models/announcement.model';
import { AnnouncementService } from 'src/app/services/announcement.service';


@Component({
    selector: 'dz-announcement-editor',
    templateUrl: './announcement-editor.component.html',
    styleUrls: ['./announcement-editor.component.scss']
})
export class AnnouncementEditorComponent implements OnInit {
    Spinner = Spinner;

    @Input() announcement: Announcement;
    @Output() change = new EventEmitter<string[]>();

    readonly spinnerName = "editorSpinner";
    pages: string[];
    selectedPageIndex: number;

    constructor(public announcementService: AnnouncementService) {
    }

    ngOnInit() {
        Spinner.show(this.spinnerName);
        this.pages = this.announcement.pages;
        if (!this.pages || this.pages.length === 0) {
            this.pages = [""];
        }
        this.selectedPageIndex = 0;
    }

    selectPage(index: number) {
        this.selectedPageIndex = index;
    }

    addPage() {
        this.pages.push("");
        this.selectedPageIndex = this.pages.length - 1;
    }

    removePage(index: number) {
        if (this.pages.length === 1) {
            this.pages = [""];
            return;
        }
        this.pages.splice(index, 1);
        if (index === this.selectedPageIndex && index >= this.pages.length) {
            this.selectPage(index - 1);
        }
    }

    moveLeft(index: number) {
        const newIndex = index - 1;
        if (newIndex >= 0) {
            const removedPage = this.pages.splice(index, 1)[0];
            this.pages.splice(newIndex, 0, removedPage);
            this.selectPage(newIndex);
        }

    }

    moveRight(index: number) {
        const newIndex = index + 1;
        if (newIndex < this.pages.length) {
            const removedPage = this.pages.splice(index, 1)[0];
            this.pages.splice(newIndex, 0, removedPage);
            this.selectPage(newIndex);
        }
    }

    applyChanges(pageContent?: string) {
        if (!!pageContent) {
            this.pages[this.selectedPageIndex] = pageContent;
        }
        this.change.emit(this.pages);
    }
}
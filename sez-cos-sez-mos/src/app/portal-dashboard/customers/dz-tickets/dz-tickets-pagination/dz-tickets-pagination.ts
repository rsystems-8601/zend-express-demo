import {Component, Output, EventEmitter, Input} from "@angular/core";
import { Pagination } from 'src/app/models/pagination.model';


@Component({
    selector: "dz-tickets-pagination",
    templateUrl: "./dz-tickets-pagination.html",
    styleUrls: ["./dz-tickets-pagination.scss"]
})
export class DzTicketsPaginationComponent {
    @Input()
    hasMorePages: boolean;
    @Output()
    pageChange = new EventEmitter<Pagination>();

    counts = [10, 25, 50, 100];
    pagination = new Pagination();

    nextPage() {
        if (this.hasMorePages) {
            this.setActivePage(this.pagination.activePage + 1);
        }
    }

    previousPage() {
        if (this.pagination.activePage > 1) {
            this.setActivePage(this.pagination.activePage - 1);
        }
    }

    setActivePage(page: number) {
        if (this.pagination.activePage !== page) {
            this.pagination.activePage = page;
            this.pageChange.emit(this.pagination);
        }
    }

    setPageSize(size: number) {
        this.pagination.activeCount = size;
        this.pagination.activePage = 1;
        this.pageChange.emit(this.pagination);

    }
}

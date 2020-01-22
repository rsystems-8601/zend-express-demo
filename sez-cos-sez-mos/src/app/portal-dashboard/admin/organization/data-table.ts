import { Observable } from 'rxjs/internal/Observable';
import { OnInit } from '@angular/core';

export abstract class DataTable implements OnInit {
    titleComponent: string;
    addbutton: string;
    pageLength: number;
    pageSize: number;
    eventValue: any;
    pageIndex: number;
    recordPage: number;
    tableData: any;
    getOrgPostDTO = {
        "orfilter": {},
        "andfilter": {
        },
        "ascSorting": [],
        "descSorting": ["id"],
        "pageNo": "1",
        "recordsPerPage": "5"

    }
    ngOnInit() {
        this.getData(this.getOrgPostDTO);
    }
    protected abstract getData(filters: any);

    //protected abstract deleteElement(element: T): Observable<any>;

    pageChanged(event: any) {
        this.getOrgPostDTO.pageNo = event.pageIndex + 1;
        this.getOrgPostDTO.recordsPerPage = event.pageSize;
        this.getData(this.getOrgPostDTO);

    }
}

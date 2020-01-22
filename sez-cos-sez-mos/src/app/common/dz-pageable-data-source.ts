import {Observable, BehaviorSubject} from "rxjs";
import { map } from 'rxjs/operators';
import {DataSource} from "@angular/cdk/collections";
import {MatPaginator, MatSort} from "@angular/material";
import {Page} from "../models/page.model";
import {PageRequest} from "../models/page-request.model";
import {Sort, SortDirection} from "../models/sort.model";

export class DzPageableDataSource<T> extends DataSource<T> {

    private data$ = new BehaviorSubject<Page<T>>(Page.empty());

    constructor(private paginator: MatPaginator,
                private sort: MatSort,
                private getData?: (pageRequest: PageRequest) => Observable<Page<T>>) {
        super();
        paginator.page.subscribe(() => this.reload());
        sort.sortChange.subscribe(() => this.reload());
    }

    reload() {
        let pageRequest = new PageRequest(this.paginator.pageSize, this.paginator.pageIndex, this.matSortToDzSort(this.sort));
        this.getData(pageRequest).subscribe(dataPage => this.data$.next(dataPage));
    }

    connect(): Observable<T[]> {
        return this.data$.asObservable().pipe(map(page => page.content));
    }

    disconnect() {
    }

    private matSortToDzSort(matSort: MatSort): Sort {
        switch (matSort.direction) {
            case "asc":
                return new Sort(matSort.active, SortDirection.ASC);
            case "desc":
                return new Sort(matSort.active, SortDirection.DESC);
            default:
                return null;
        }
    }
}
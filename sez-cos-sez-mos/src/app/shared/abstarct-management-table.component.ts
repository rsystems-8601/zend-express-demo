import { DataTableSharedService } from './data-table/data-table.service';
import { Router, ActivatedRoute } from '@angular/router';
import {remove as _remove} from "lodash";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort} from "@angular/material";
import {AfterViewInit, OnInit, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import { tap } from 'rxjs/operators';
import {DzPageableDataSource} from "../common/dz-pageable-data-source";

import {FilteringService, Operator} from "../services/filtering.service";
import {DateUtils} from "../common/date-utils";
import {DzDeleteConfirmationManagementComponent} from "./delete-confirmation/dz-delete-confirmation-management.component";
import { PageRequest } from '../models/page-request.model';
import { Page } from '../models/page.model';


export abstract class AbstractManagementTableComponent<T> implements OnInit, AfterViewInit {

    Operator = Operator;
    DateUtils = DateUtils;

    abstract columns: string[];
    protected abstract editDialogComponent: any;

    protected filteringService = new FilteringService();

    dataSource: DzPageableDataSource<T>;
    totalElements: number;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(protected dialog?: MatDialog, protected router?: Router, protected route?: ActivatedRoute,
                protected dataService?: DataTableSharedService) {
    }

    ngOnInit(): void {
        this.dataSource = new DzPageableDataSource<T>(this.paginator, this.sort, pageRequest =>
            this.getData(pageRequest, this.filteringService.filters)
                .pipe(tap(page => this.totalElements = page.totalElements))
        );
        // console.log(this.dataSource);
        this.filteringService.getAllFiltersObservable().subscribe(() => this.dataSource.reload());
    }

    ngAfterViewInit(): void {
        this.dataSource.reload();
    }

    filterBy(name: string, operator: Operator, value: any) {
        this.filteringService.and(operator, name, value);
    }

    filterByMultiple(name: string, values: { id: number }[]) {
        this.filterBy(name, Operator.ARE_MEMBERS, values && values.map(value => value.id).join(","));
    }

    entityToString(entityOrArray: any | any[], toString = (entity: any) => entity.name) {
        return entityOrArray && Array.isArray(entityOrArray)
            ? entityOrArray.map(toString).join(", ")
            : toString(entityOrArray);
    }

    openEditDialog(element?: T, dialogConfig: MatDialogConfig<T> = {}) {
       // console.log(dialogConfig);

        if (element) {
            dialogConfig.data = element;
            if(this.router){
              this.dataService.setRowData = element;
              this.router.navigate(['./',element["id"]], {relativeTo: this.route});
            }
        }
        if(!this.router){
          dialogConfig.width = dialogConfig.width || "450px";
          this.dialog.open(this.editDialogComponent, dialogConfig).afterClosed()
              .subscribe(element => element && this.dataSource.reload());
        }
    }

    delete(element: T) {
        this.deleteElement(element).spinner().subscribe(() => this.dataSource.reload());
    }

    confirmDeletion(element: T, message: string = null, params: any = null) {
        let data = message ? {message: message, params: params} : null;
        this.dialog.open(DzDeleteConfirmationManagementComponent, {data: data, width: "650px"})
            .afterClosed()
            .subscribe(confirmed => {
                if (confirmed) {
                    this.delete(element);
                }
            });
    }


    protected removeColumn(name: string) {
        _remove(this.columns, column => column === name);
    }

    protected abstract getData(pageRequest: PageRequest, filters: any): Observable<Page<T>>;

    protected abstract deleteElement(element: T): Observable<any>;
}

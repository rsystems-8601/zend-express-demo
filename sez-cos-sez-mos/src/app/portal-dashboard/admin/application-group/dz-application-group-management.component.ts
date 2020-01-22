import { DataTableSharedService } from './../../../shared/data-table/data-table.service';
import {Component} from "@angular/core";
import {MatDialog} from "@angular/material";
import {DzEditApplicationGroupComponent} from "./dz-edit-application-group/dz-edit-application-group.component";

import {Observable} from "rxjs";
import { AbstractManagementTableComponent } from 'src/app/shared/abstarct-management-table.component';
import { ApplicationGroup } from 'src/app/models/application-group.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { ApplicationGroupService } from '../application/application-group.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { Permission } from 'src/app/models/permission.model';
import { PageRequest } from 'src/app/models/page-request.model';
import { Page } from 'src/app/models/page.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({templateUrl: "./dz-application-group-management.component.html"})
export class DzApplicationGroupManagementComponent extends AbstractManagementTableComponent<ApplicationGroup> {

    columns = ["name", "organizations", "owner", "actions"];
    protected editDialogComponent = DzEditApplicationGroupComponent;

    readonly: boolean;

    constructor(public organizationService: OrganizationService,
                public applicationGroupService: ApplicationGroupService,
                public auth: AuthHolderService,
                protected router: Router,
                protected route: ActivatedRoute,
                protected dataService: DataTableSharedService,
                dialog: MatDialog) {
        super(dialog, router, route, dataService);

        this.readonly = !auth.hasPermission(Permission.EDIT_APPLICATION_GROUPS);
        this.readonly = false;
        if (this.readonly) {
            this.removeColumn("actions");
        }
        if (auth.isOrganizationAdmin()) {
            this.removeColumn("organizations");
        }
    }

    protected getData(pageRequest: PageRequest, filters: any): Observable<Page<ApplicationGroup>> {
        return this.applicationGroupService.getAppGroups(pageRequest, filters);
    }

    protected deleteElement(element: ApplicationGroup): Observable<any> {
        return this.applicationGroupService.deleteAppGroup(element.id);
    }
}

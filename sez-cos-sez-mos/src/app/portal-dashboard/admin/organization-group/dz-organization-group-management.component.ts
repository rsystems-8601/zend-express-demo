import { ActivatedRoute, Router } from '@angular/router';
import {Component} from "@angular/core";
import {MatDialog} from "@angular/material";
import {DzEditOrganizationGroupComponent} from "./dz-edit-organization-group/dz-edit-organization-group.component";
import {Observable} from "rxjs";
import { AbstractManagementTableComponent } from 'src/app/shared/abstarct-management-table.component';
import { OrganizationService } from 'src/app/services/organization.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { Permission } from 'src/app/models/permission.model';
import { PageRequest } from 'src/app/models/page-request.model';
import { Page } from 'src/app/models/page.model';
import { OrganizationGroupService } from './organziation-group.service';
import { OrganizationGroup } from 'src/app/models/organization-group.model';
import { DataTableSharedService } from '../../../shared/data-table/data-table.service';


@Component({templateUrl: "./dz-organization-group-management.component.html"})
export class DzOrganizationGroupManagementComponent extends AbstractManagementTableComponent<OrganizationGroup> {

    columns = ["name", "organizations", "owner", "actions"];
    protected editDialogComponent = DzEditOrganizationGroupComponent;

    readonly: boolean;

    constructor(public organizationService: OrganizationService,
                public organizationGroupService: OrganizationGroupService,
                public auth: AuthHolderService,
                dialog: MatDialog, public router: Router,
                protected route: ActivatedRoute,
                protected dataTableService: DataTableSharedService) {
        super(dialog, router, route, dataTableService);

        this.readonly = !auth.hasPermission(Permission.EDIT_ORGANIZATION_GROUPS);
        this.readonly = false;
        if (this.readonly) {
            this.removeColumn("actions");
        }
    }

    protected getData(pageRequest: PageRequest, filters: any): Observable<Page<OrganizationGroup>> {
        return this.organizationGroupService.getOrgGroups(pageRequest, filters);
    }

    protected deleteElement(element: OrganizationGroup): Observable<any> {
        return this.organizationGroupService.deleteOrgGroup(element.id);
    }
}

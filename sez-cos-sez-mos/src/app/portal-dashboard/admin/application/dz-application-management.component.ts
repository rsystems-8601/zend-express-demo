import { DataTableSharedService } from './../../../shared/data-table/data-table.service';
import {Component} from "@angular/core";
import {MatDialog} from "@angular/material";


import {Observable} from "rxjs";
import { AbstractManagementTableComponent } from '../../../shared/abstarct-management-table.component';
import { DzEditApplicationComponent } from './dz-edit-application/dz-edit-application.component';
import { OrganizationService } from '../../../services/organization.service';
import { AuthHolderService } from '../../../services/auth-holder.service';
import { Permission } from '../../../models/permission.model';
import { PageRequest } from '../../../models/page-request.model';
import { Page } from '../../../models/page.model';
import { ApplicationService } from './application.service';
import { ApplicationGroupService } from './application-group.service';
import { Application } from '../../../models/application.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({templateUrl: "./dz-application-management.component.html"})
export class DzApplicationManagementComponent extends AbstractManagementTableComponent<Application> {

    columns = ["name", "description", "url", "horizon", "applicationGroups", "owner", "actions"];
    protected editDialogComponent = DzEditApplicationComponent;

    readonly: boolean;

    constructor(public organizationService: OrganizationService,
                public applicationService: ApplicationService,
                public applicationGroupService: ApplicationGroupService,
                public auth: AuthHolderService,
                dialog: MatDialog,
                protected router: Router,
                protected route: ActivatedRoute,
                protected dataService: DataTableSharedService
              ) {
        super(dialog);

        this.readonly = !auth.hasPermission(Permission.EDIT_APPLICATIONS);
        this.readonly = false;
        if (this.readonly) {
            this.removeColumn("actions");
        }
    }

    protected getData(pageRequest: PageRequest, filters: any): Observable<Page<Application>> {
        return this.applicationService.getApplications(pageRequest, filters);
    }

    protected deleteElement(element: Application): Observable<any> {
        return this.applicationService.deleteApplication(element.id);
    }
}

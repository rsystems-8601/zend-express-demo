import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import { ApplicationGroup } from 'src/app/models/application-group.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { ApplicationGroupService, ApplicationGroupCreateUpdateRequest } from '../../application/application-group.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { DzValidators } from 'src/app/common/dz-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableSharedService } from '../../../../shared/data-table/data-table.service';

@Component({templateUrl: "./dz-edit-application-group.component.html"})
export class DzEditApplicationGroupComponent {

    form: FormGroup;
    applicationGroup: ApplicationGroup;

    constructor(
                public organizationService: OrganizationService,
                public applicationGroupService: ApplicationGroupService,
                public auth: AuthHolderService,
                public formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private dataService: DataTableSharedService
              ) {

                this.initForm();
                this.route.params
                  .subscribe(param => {
                    console.log(param);
                    if (this.dataService.getRowData && param.id) {
                      this.applicationGroup = this.dataService.getRowData;
                      this.initForm();
                    } else if (param.id) {
                      this.redirectToParent();
                    } else {
                      this.initForm();
                    }
                  });

    }

    initForm(){
      const uniqueNameValidator = DzValidators.asyncUnique(
        name => this.applicationGroupService.checkNameUnique(name),
        this.applicationGroup && this.applicationGroup.name
    );

      this.form = this.formBuilder.group({
        name: [this.applicationGroup && this.applicationGroup.name, [], uniqueNameValidator],
        organizations: [this.applicationGroup && this.applicationGroup.organizations]
    });
    }

    save() {
        let form = this.form.value;
        let createUpdateRequest: ApplicationGroupCreateUpdateRequest = {
            name: form.name,
            organizationIds: this.auth.isOrganizationAdmin()
                ? [this.auth.getAuthentication().organizationId]
                : form.organizations.map(org => org.id),
            enabled: true
        };
         let request$: Observable<ApplicationGroup> = this.applicationGroup
            ? this.applicationGroupService.updateAppGroup(this.applicationGroup.id, createUpdateRequest)
            : this.applicationGroupService.saveAppGroup(createUpdateRequest);

        request$.spinner().subscribe(group => this.redirectToParent());
    }

    redirectToParent(){
      this.router.navigate(['../'], { relativeTo: this.route });
    }

}

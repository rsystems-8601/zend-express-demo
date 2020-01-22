import { ActivatedRoute, Router } from '@angular/router';
import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import { OrganizationGroup } from 'src/app/models/organization-group.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { OrganizationGroupService, OrgGroupCreateUpdateRequest } from '../organziation-group.service';
import { DzValidators } from 'src/app/common/dz-validators';
import { DataTableSharedService } from '../../../../shared/data-table/data-table.service';

// ../../../../../shared/data-table/data-table.service

@Component({templateUrl: "./dz-edit-organization-group.component.html"})
export class DzEditOrganizationGroupComponent {
  public organizationGroup: OrganizationGroup;
    form: FormGroup;

    constructor(public organizationService: OrganizationService,
                public organizationGroupService: OrganizationGroupService,
                public formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private dataTableService: DataTableSharedService
              ) {

                this.route.params
                .subscribe( param => {
                  console.log(param);
                  if(this.dataTableService.getRowData && param.id){
                    this.organizationGroup = this.dataTableService.getRowData;
                    this.initForm();
                  }else if( param.id ){
                    this.router.navigate(['../'],{relativeTo: this.route})
                  }else{
                    this.initForm();
                  }
                })
    }


    initForm() {
      const uniqueNameValidator = DzValidators.asyncUnique(
        name => this.organizationService.checkNameUnique(name),
        this.organizationGroup && this.organizationGroup.name
    );


    this.form = this.formBuilder.group({
      name: [this.organizationGroup && this.organizationGroup.name, [], uniqueNameValidator],
      organizations: [this.organizationGroup && this.organizationGroup.organizations]
  });

}

    save() {
      const form = this.form.value;
      const createUpdateRequest: OrgGroupCreateUpdateRequest = {...form};

      createUpdateRequest.organizationIds = createUpdateRequest['organizations'].map( rec => rec["id"] );
      delete createUpdateRequest['organizations'];

      const request$ = this.organizationGroup
          ? this.organizationGroupService.updateOrgGroup(this.organizationGroup.id, createUpdateRequest)
          : this.organizationGroupService.saveOrgGroup(createUpdateRequest);

      request$.subscribe(group => this.cancelEdit());
  }



   cancelEdit(){
    if(this.organizationGroup && this.organizationGroup.id){
      this.router.navigate(['../../configure'], {relativeTo: this.route});
    }else{
      this.router.navigate(['../configure'], {relativeTo: this.route});
    }

  }


}

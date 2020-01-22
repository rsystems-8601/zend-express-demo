import { Router, ActivatedRoute } from '@angular/router';
import { DataTableSharedService } from './../../../../shared/data-table/data-table.service';
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { ApplicationGroupService } from "../application-group.service";
import { ApplicationCreateUpdateRequest, ApplicationService } from "../application.service";
import { Application } from "../../../../models/application.model";

@Component({ templateUrl: "./dz-edit-application.component.html" })
export class DzEditApplicationComponent {
  public application: Application;
  form: FormGroup;

  constructor(public applicationService: ApplicationService,
              public applicationGroupService: ApplicationGroupService,
              public formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataTableSharedService) {
    this.initForm();
    this.route.params
      .subscribe(param => {
        console.log(param);
        if (this.dataService.getRowData && param.id) {
          this.application = this.dataService.getRowData;
          this.initForm();
        } else if (param.id) {
          this.redirectToParent();
        } else {
          this.initForm();
        }
      });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [this.application && this.application.name],
      description: [this.application && this.application.description],
      url: [this.application && this.application.url],
      horizon: [this.application ? this.application.horizon : false],
      applicationGroups: [this.application && this.application.applicationGroups]
    });
 }

  save() {
    let form = this.form.value;
    let createUpdateRequest: ApplicationCreateUpdateRequest = {
      name: form.name,
      description: form.description,
      url: form.url,
      horizon: form.horizon,
      applicationGroupIds: form.applicationGroups.map(org => org.id)
    };
    let request$: Observable<Application> = this.application
      ? this.applicationService.updateApplication(this.application.id, createUpdateRequest)
      : this.applicationService.saveApplication(createUpdateRequest);

    request$.spinner().subscribe(app => this.redirectToParent()); //this.dialogRef.close(app));
  }

  redirectToParent(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

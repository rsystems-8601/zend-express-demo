import { Component, Inject, OnInit, OnChanges } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { CreateHardwarecluster } from 'src/app/models/cos-common.model';
import { HardwareclusterService, HardwareClusterCreateUpdateRequest } from '../hardware-cluster.service';
import { DataTableSharedService } from 'src/app/shared/data-table/data-table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from "ngx-toasty";

// import { OrganizationService} from "../../../../services/organization.service";
// import { RoleService } from "../../../../services/role.service";
// import { AuthHolderService } from "../../../../services/auth-holder.service";
// For customer custom files 

@Component({
    templateUrl: "./cos-edit-hardware-cluster.component.html"
})

export class CosEdithardwareclusterComponent implements OnInit, OnChanges {

    hardwareclusterForm: FormGroup;
    hardwareclusterData: CreateHardwarecluster[];
    categoryStatus = false;
    Title: string;
    podId: number;
    clusterId: number;
    hardwareCluster: CreateHardwarecluster;
    updateId: any;
    hardwareForm: any;

    constructor(
        public hardwareclusterService: HardwareclusterService,
        public formBuilder: FormBuilder,
        private dataService: DataTableSharedService,
        private route: ActivatedRoute,
        private router: Router,
        private toastyService: ToastyService
    ) {
        // Form Title
        this.Title = "Update Hardware Cluster";
        // Form Data
        this.hardwareclusterForm = this.formBuilder.group({
            name: [this.hardwareCluster && this.hardwareCluster.name]
        });

    }

    ngOnInit() {
        this.route.params
            .subscribe(param => {
                if (this.dataService.getRowData && param.id) {
                    this.updateId = this.dataService.getRowData.id;
                    this.hardwareclusterForm.patchValue(this.dataService.getRowData);
                }
            });

    }

    ngOnChanges() {

    }

    canceltoList() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    saveHardwarecluster() {


        this.hardwareForm = this.hardwareclusterForm.value;
        this.hardwareForm['id'] = this.updateId;

        this.hardwareclusterService.savehardwareCluster(this.hardwareForm).subscribe(data => {
            if (data) {
                this.toastyService.success('Record updated successfully');
                this.hardwareclusterService.getReloaddata(true);
            }
            if (!data) {
                this.toastyService.error('Process failed, please try again');
            }
        });

    }


}
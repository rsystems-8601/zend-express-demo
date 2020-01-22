import { Component, Inject, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { of } from 'rxjs';
// For customer custom files 
import { NetworkIps } from "../../models/private-ips.model";
import { DatacenterService } from '../../services/datacenter.service';
import { PublicvlansService } from '../../services/public-vlans.service';
import { CustomErrorStateMatcher } from 'src/app/shared/customErrorStateMatcher';
import { ToastyService } from 'ngx-toasty';

@Component({
  selector: 'app-create-public-vlan',
  templateUrl: './create-public-vlan.component.html',
  styleUrls: ['./create-public-vlan.component.scss']
})
export class CreatePublicVlanComponent implements OnInit {

  pageTitle = "Create Public VLAN";
  ft: FormGroup;
  sd: FormGroup;
  dataCenterId: number;
  datacenterName: any;
  environment: string;
  envormentTypes: string[] = ["Compliant", "Non Compliant"];
  matcher = new CustomErrorStateMatcher();

  constructor(
    public formBuilder: FormBuilder,
    public datacenterService: DatacenterService,
    public publicvlansService: PublicvlansService,
    public route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService
  ) {

    this.dataCenterId = this.route.parent.parent.parent.parent.snapshot.params.id;
    const numberONly = '[1-9]\d*|0\d+';
    this.ft = this.formBuilder.group({
      dataCenterId: [],
      environmentType: [],
    });



    this.sd = this.formBuilder.group({
      from: new FormControl(null, [Validators.required, Validators.max(4096), Validators.pattern("^[0-9]*$")]),
      to: new FormControl(null, [Validators.required, Validators.max(4096), Validators.pattern("^[0-9]*$")]),
    });

    this.datacenterService.getDatacenterdetails(this.dataCenterId).subscribe(datacentervalue => {
      this.datacenterName = datacentervalue.name;
      this.ft.controls.dataCenterId.setValue(datacentervalue.id);
    })
  }

  ngOnInit() {

  }

  get from() { return this.sd.get('from') };
  get to() { return this.sd.get('to') };
  get environementType() { return this.ft.get('environmentType') };

  createPublicVLANRequest() {
    this.sd.controls.from.markAsTouched();
    this.sd.controls.to.markAsTouched();
    if (this.sd.valid) {
      const form = { ...this.ft.value, ...this.sd.value };
      const createPublicVlanRequest = {
        start: form.from,
        last: form.to,
        environmentType: form.environmentType.replace(/ /g, ''),
        dataCenterId: this.dataCenterId,
      };

      this.publicvlansService.createPublicvlan(createPublicVlanRequest).subscribe(data => {
        if (data) {
          this.toastyService.success('Record saved successfully!');
          this.router.navigate(['configure', 'public-vlan'], { relativeTo: this.route.parent.parent.parent, queryParams: { type: true } })
        }
        if (!data) {
          this.toastyService.error('Process failed, please try again');
        }
      }, err => {
        console.log('public vlan creation Error : ' + err);
      });
    }

  }
}

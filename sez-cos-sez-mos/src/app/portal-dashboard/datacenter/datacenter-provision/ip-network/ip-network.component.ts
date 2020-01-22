import { Component, Inject, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { of } from 'rxjs';
// For customer custom files 
import { NetworkIps } from "../../models/private-ips.model";
import { DatacenterService } from '../../services/datacenter.service';
import { environment } from 'src/environments/environment';
import { CustomErrorStateMatcher } from 'src/app/shared/customErrorStateMatcher';
import { ToastyService } from 'ngx-toasty';

@Component({
  selector: 'app-ip-network',
  templateUrl: './ip-network.component.html',
  styleUrls: ['./ip-network.component.scss']
})
export class IpNetworkComponent implements OnInit {

  pageTitle = "Create IP Network";
  ft: FormGroup;
  sd: FormGroup;
  publicVlanList: [];
  networkData: any;
  isPublicIp = false;
  dataCenterId: number;
  datacenterName: any;
  environment: string;


  envormentTypes: string[] = ["Compliance", "Non Compliance"];
  ipTypes: string[] = ["Public", "Private", "Elastic"];
  networkips: NetworkIps;
  matcher = new CustomErrorStateMatcher();
  constructor(
    public formBuilder: FormBuilder,
    public datacenterService: DatacenterService,
    public route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService
  ) {

    this.dataCenterId = +(this.route.parent.parent.parent.parent.snapshot.params.id);

    const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    const numberONly = '[1-9]\d*|0\d+';
    this.ft = this.formBuilder.group({
      dataCenterId: [],
      environmentType: [this.networkips && this.networkips.environmentType],
      ipType: [this.networkips && this.networkips.ipType],
    });



    this.sd = this.formBuilder.group({
      networkIp: ['', [Validators.required, Validators.pattern(ipPattern)]],
      cidrNumber: ['', [Validators.required, Validators.pattern(numberONly)]],
      gateway: ['', [Validators.required, Validators.pattern(ipPattern)]],
      subnetMask: ['', [Validators.pattern(ipPattern)]],
    });

    this.datacenterService.getDatacenterdetails(this.dataCenterId).subscribe(datacentervalue => {
      this.datacenterName = datacentervalue.name;
      this.ft.controls['dataCenterId'].setValue(datacentervalue.id);
    })

    // this.isPublicIp = this.route.snapshot.url[0].path.indexOf("public=true")>0
    // this.dataCenterId = 72;
    this.environment = "Compliance";
  }

  ngOnInit() {
    // Get vlan list
    const reqPayload = {
      dataCenterId: this.dataCenterId,
      environmentType: "Compliant"
    };

    this.datacenterService.getPublicVlanList(reqPayload)
      .subscribe((data) => {
        this.publicVlanList = data;
        //console.log('VLANLIST',data)
      });

    this.ft.get('ipType').valueChanges
      .subscribe
      (data => {
        console.log(data);
        if (data === 'Public') {
          this.isPublicIp = true;
          this.sd.addControl('vlanId', new FormControl('', [Validators.required]));
        } else {
          this.isPublicIp = false;
          this.sd.removeControl('vlanId');
        }
      })

    this.sd.get('cidrNumber').valueChanges
      .subscribe(cidrNumber => {
        if (cidrNumber > 0 && cidrNumber < 33) {
          this.sd.get('subnetMask').setValue(this.createNetmaskAddr(cidrNumber));
        } else {
          this.sd.get('subnetMask').setValue('');
        }
      })
  }
  get networkIp() { return this.sd.get('networkIp') };
  get gateway() { return this.sd.get('gateway') };
  get subnetMask() { return this.sd.get('subnetMask') };

  savePrivateIp() {

    // this.sd.controls['networkIp'].markAsTouched();
    // this.sd.controls['cidrNumber'].markAsTouched();
    // this.sd.controls['gateway'].markAsTouched();
    // // this.sd.controls['subnetMask'].markAsTouched();
    // this.sd.controls['vlanId'].markAsTouched();



    const form = { ...this.ft.value, ...this.sd.value };
    const createUpdateRequest = {
      id: null,
      networkIp: form.networkIp,
      cidrNumber: form.cidrNumber,
      gateway: form.gateway,
      subnetMask: form.subnetMask,
      type: this.isPublicIp,
      environment: this.environment,
      dataCenterId: this.dataCenterId,
      vlanId: this.isPublicIp ? form.vlanId : null
    };

    if (this.sd.valid) {
      this.datacenterService.createPrivateip(createUpdateRequest).subscribe(data => {
        if (data) {
          this.toastyService.success('Record added successfully!');
        }
        if (!data) {
          this.toastyService.error('Process failed, please try again');
        }
        if (this.isPublicIp) {
          this.router.navigate(['configure', 'ip-network'], { relativeTo: this.route.parent.parent.parent, queryParams: { type: true } })
        } else {
          this.router.navigate(['configure', 'ip-network'], { relativeTo: this.route.parent.parent.parent, queryParams: { type: false } })
        }
      }, err => {
        if (this.isPublicIp) {
          this.router.navigate(['configure', 'ip-network'], { relativeTo: this.route.parent.parent.parent, queryParams: { type: true } })
        } else {
          this.router.navigate(['configure', 'ip-network'], { relativeTo: this.route.parent.parent.parent, queryParams: { type: false } })
        }
      });
    }


  }

  createNetmaskAddr(bitCount: number) {

    var mask = [];
    for (var i = 0; i < 4; i++) {
      var n = Math.min(bitCount, 8);
      mask.push(256 - Math.pow(2, 8 - n));
      bitCount -= n;
    }
    console.log('MASK', mask);
    return mask.join('.');
  }
}

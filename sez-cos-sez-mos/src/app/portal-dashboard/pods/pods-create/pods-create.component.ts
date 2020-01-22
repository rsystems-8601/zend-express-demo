import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { Poddetails } from 'src/app/models/poddetails.model';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PodServicesService } from '../pod-services.service';
import { DataTableSharedService } from 'src/app/shared/data-table/data-table.service';
import { ToastyService } from 'ngx-toasty';
import { CustomErrorStateMatcher } from 'src/app/shared/customErrorStateMatcher';


@Component({
  selector: 'app-pods',
  templateUrl: './pods-create.component.html',
  styleUrls: ['./pods-create.component.scss']
})
export class PodsCreateComponent implements OnInit {

  ft: FormGroup;
  sd: FormGroup;
  th: FormGroup;
  fr: FormGroup;
  ordersData = [];

  podForm: any;
  datacetneridValue: number;
  datacenterName: any;
  datacentereachId: number;
  podId: number;
  dataCenterId: number;
  podEnv: any;
  envormentTypes: string[] = ["Compliance", "Non Compliance"];
  networkTypeArr: string[] = ["LEGACY", "NSX_T", "NSX_V", "UAG"];
  networkTypeIndex = {
    LEGACY: 0,
    NSX_T: 1,
    NSX_V: 2,
    UAG: 3
  }
  podNameshow: any;
  networkData: FormArray;
  poddetails: Poddetails;
  podTitle: string;
  updatePodStatus: string;
  matcher = new CustomErrorStateMatcher();
  constructor(
    public podsService: PodServicesService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataTableService: DataTableSharedService,
    private toastyService: ToastyService
  ) {
    this.dataCenterId = this.route.parent.parent.parent.parent.snapshot.params.id;
    // console.log('***',this.dataCenterId);
    this.podId = this.route.parent.parent.parent.parent.snapshot.params.podId;
    this.initForm();


  }

  initForm() {
    //  this.dataCenterId = this.route.parent.parent.parent.parent.snapshot.params.id; 
    // // console.log('***',this.dataCenterId);
    //  this.podId = this.route.parent.parent.parent.parent.snapshot.params.podId;

    // URL Validations
    const regUrl = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    const applienceText = '^[A-Za-z0-9.\d\s_-]+$';
    const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    // Password validations
    const passWordreg = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
    const numberONly = '[1-9]\d*|0\d+';


    //  this.minSelectedCheckboxes(1)

    // Form Groups
    this.ft = this.formBuilder.group({
      dataCenterId: [],
      environmentType: [this.poddetails && this.poddetails.environmentType],
      datacenterSlot: [this.poddetails && (+this.poddetails.datacenterSlot), [Validators.required, Validators.pattern(numberONly)]]
    });
    this.sd = this.formBuilder.group({
      podName: [this.poddetails && this.poddetails.podName, [Validators.required, Validators.pattern(applienceText)]],
      managementUrl: [this.poddetails && this.poddetails.managementUrl, [Validators.required, Validators.pattern(regUrl)]],
      networkType: new FormArray([], this.minSelectedCheckboxes(1))

    });
    this.th = this.formBuilder.group({
      activeDirectoryIPAddress: ['', [Validators.required, Validators.pattern(ipPattern)]],
      activeDirectoryDomainName: [this.poddetails && this.poddetails.domain, [Validators.required, Validators.pattern(regUrl)]],
      activeDirectoryUsername: [],
      activeDirectoryPassword: ['', [Validators.required, Validators.pattern(passWordreg)]]
    });
    this.fr = this.formBuilder.group({
      privateIP: [this.poddetails && this.poddetails.vCenter &&
        this.poddetails.vCenter.privateIP, [Validators.required, Validators.pattern(ipPattern)]],
      name: [this.poddetails && this.poddetails.vCenter && this.poddetails.vCenter.name],
      vCenterpassword: ['', [Validators.required, Validators.pattern(passWordreg)]],
      version: [this.poddetails && this.poddetails.vCenter &&
        this.poddetails.vCenter.version, [Validators.required, Validators.pattern(applienceText)]],
      url: [this.poddetails && this.poddetails.vCenter && this.poddetails.vCenter.url, [Validators.required, Validators.pattern(regUrl)]]
    });



    // Data center details | For now it is static will come from data center or pod
    this.podsService.getDatacenterdetails(this.dataCenterId).subscribe(datacentervalue => {
      this.datacenterName = datacentervalue.name;
      this.datacetneridValue = datacentervalue.id;
    })



    of(this.getOrders()).subscribe(orders => {
      this.ordersData = orders;
      this.addCheckboxes();
    });
  }

  ngOnInit() {


    if (this.route.snapshot.queryParamMap.get('title') == 'podUpdate') {
      this.updatePod();
      this.updatePodStatus = "Update";
      this.podTitle = "POD Update";
    } else {
      this.podTitle = "POD Create";
      this.updatePodStatus = "Save";
    }


    this.route.params
      .subscribe(param => {
        if (this.dataTableService.getRowData && param.id) {
          this.poddetails = this.dataTableService.getRowData;
          this.podId = param.id;
          this.initForm();
          this.updatePod();
        } else if (param.id) {
          this.podId = param.id;
          this.updatePod();
          // this.router.navigate(['../../'],{relativeTo: this.route})
        } else {
          this.initForm();
        }
      })

  }

  public get networkTypeControl() {
    return (<FormArray>this.sd.controls.networkType).controls
  }
  private addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl();
      (this.sd.controls.networkType as FormArray).push(control);
    });
  }


  getOrders() {
    return this.networkTypeArr;
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);

      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }


  validateNetworkType() {
    if (this.sd.invalid) {
      this.sd.get('networkType').markAsDirty();
      return;

    } else {

    }
    // do something else
  }


  get podName() { return this.sd.get('podName') };
  get managementUrl() { return this.sd.get('managementUrl') };
  get activeDirectoryDomainName() { return this.th.get('activeDirectoryDomainName') };
  get activeDirectoryPassword() { return this.th.get('activeDirectoryPassword') };
  get privateIP() { return this.fr.get('privateIP') };
  get activeDirectoryIPAddress() { return this.th.get('activeDirectoryIPAddress') };
  get vCenterpassword() { return this.fr.get('vCenterpassword') };
  get version() { return this.fr.get('version') };
  get url() { return this.fr.get('url') };

  get datacenterSlot() { return this.ft.get('datacenterSlot') };




  updatePod() {

    this.podsService.getPodDetails(this.podId).subscribe((data) => {
      this.poddetails = <Poddetails>data;
      this.podNameshow = this.poddetails.podName;
      this.ft.patchValue(this.poddetails);
      this.sd.patchValue(this.poddetails);
      this.th.patchValue(this.poddetails);
      this.fr.patchValue(this.poddetails);

      const networktype = this.poddetails.networkType;
      const networkControls = (<FormArray>this.sd.get('networkType')).controls;
      networktype.forEach(elementnetwork => {
        networkControls[this.networkTypeIndex[elementnetwork]].setValue(true);
      });

      const vCenter = this.poddetails.vCenter;
      this.fr.get('privateIP').patchValue(vCenter.privateIP);
      this.fr.get('name').patchValue(vCenter.name);
      this.fr.get('version').patchValue(vCenter.version);
      this.fr.get('url').patchValue(vCenter.url);
      // this.fr.get('url').patchValue(vCenter.url);
      // console.log(this.poddetails);
    });

  }




  savePoddata() {
    this.podForm = { ...this.fr.value, ...this.ft.value, ...this.sd.value, ...this.th.value };
    this.podForm['dataCenterId'] = this.datacetneridValue;
    const selectedOrderIds = this.sd.value.networkType.map((v, i) => v ? this.ordersData[i] : null).filter(v => v !== null);
    this.podForm['networkType'] = selectedOrderIds;
    this.podForm['rackUnits'] = 10;
    this.podForm['podNotationId'] = this.sd.value.podName;
    this.podForm['vCenter'] = { ...this.fr.value }
    this.podForm['additionalInfo'] = "Additional Info";
    this.podForm['domain'] = this.th.value.activeDirectoryDomainName;
    this.podForm['isValidatedActiveDirectory'] = false;

    // console.log(this.podForm);

    if (this.poddetails) {
      this.podForm['id'] = this.poddetails.id;
      this.podForm['podNotationId'] = this.poddetails.podNotationId;
      this.podForm['maxTorSwitches'] = 20;
      this.podForm['maximumHwClusters'] = 10;
      this.podForm['maxStorageClusters'] = 10;
      this.podForm['max10GBSwitches'] = 10;
      this.podForm['maxServers'] = this.poddetails.max10GBSwitches;
      this.podForm['maxIPMISwitches'] = 10;

      Object.assign(this.podForm['vCenter'], { id: this.poddetails.vCenter.id })
      this.podsService.updatePodData(this.podForm).subscribe(data => {

        // if (this.route.snapshot.queryParamMap.get('title') === 'podUpdate' && this.podId) {
        //   // this.router.navigate(['../', 'pod-list'], { relativeTo: this.route.parent });
        //   this.router.navigateByUrl('console/datacenter-list/' + (this.dataCenterId) + '/configure/pod-list');
        // }
        if (!data) {
          this.toastyService.error('Process failed, please try again');
        } else {
          this.toastyService.success('Record updated successfully!');
          this.router.navigateByUrl('console/datacenter-list/' + (this.dataCenterId) + '/configure/pod-list');
        }
      });
    } else {
      this.podsService.savePodData(this.podForm).subscribe(data => {
        this.toastyService.success('Record saved successfully!');
        // this.router.navigate(['../']); 
        if (!data) {
          this.toastyService.error('Process failed, please try again');
        }
        this.router.navigateByUrl('console/datacenter-list/' + (this.dataCenterId) + '/configure/pod-list');

      });

    }

  }



}

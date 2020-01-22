import { Component, OnInit, Inject } from '@angular/core';
// import { Role } from "../../../../models/role.model";
// import { RoleService } from "../../../services/role.service";
// import { AuthHolderService } from "../../../services/auth-holder.service";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

// Custom models and services 

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Pods, Datacenter, rackType } from '../../../../models/cos-common.model';
import { CoscommonService } from '../../services/cos-common.service';
import { Datacenterdetails, countryView, cityView } from '../../../../models/datacenterdetails.model';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ngx-toasty';
// import { CustomErrorStateMatcher } from 'src/app/shared/customErrorStateMatcher';


@Component({
  selector: 'app-datacenter-details',
  templateUrl: './datacenter-details.component.html',
  styleUrls: ['./datacenter-details.component.scss']
})
export class DataCenterdetailsComponent implements OnInit {

  pageTitle: string = "Data Center DETAILS:";
  // podcreateForm: FormGroup; 
  dataCenters: Datacenter[];
  ft: FormGroup;
  sd: FormGroup;
  th: FormGroup;
  datacenterId: number;
  podId: number = 60;
  updateDetailsStatus: boolean;
  datacenterUpdateForm: any;
  rackTypevalues: any;
  powerTypevalues: rackType;
  isBiometricvalues: boolean[] = [true, false];
  isCameravalues: boolean[] = [true, false];
  showcomplinceTextbox: boolean;
  showNoncomplinceTextbox: boolean;
  countryList: any;
  stateList: any;
  cityList: any;
  cityName: FormControl;
  filteredOptions: Observable<cityView[]>;
  filterOptionsZip: Observable<string[]>;
  selectedCity: cityView;
  rackTypeName: string;
  powerTypeName: any;
  datacenterAll: any;
  datacenterallValues: Datacenterdetails;
  details: any;
  configuration: any;
  addressDetails: any;
  titleDatacenter: string;

  createDatacenterFormStatus: boolean;
  updateDatacenterFormStatus: boolean;
  detailsDatacenterStatus: boolean;
  updateBtnstatus: boolean;
  readonly: string;
  viewButton: any;
  validCompliance = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datacenterDetails: Datacenterdetails,
    public dialogRef: MatDialogRef<DataCenterdetailsComponent>,
    private datacenterService: CoscommonService,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService
  ) {
    this.datacenterId = this.activatedRoute.parent.parent.parent.snapshot.params.id;
  }

  ngOnInit() {

    if (this.activatedRoute.snapshot.queryParamMap.get('title') == 'dataCenterAdd') {
      this.createDatacenter();
      this.titleDatacenter = "Create Data Center";
      this.updateDatacenterFormStatus = true;
      this.detailsDatacenterStatus = false;
      this.updateBtnstatus = false;
    } else {
      this.titleDatacenter = "Data Center Details";
      this.loadDatacenterDetails();
      this.detailsDatacenterStatus = true;
      this.createDatacenterFormStatus = false;
    }

  }

  /*
 * Load Method to get full details of datacnter
 */
  loadDatacenterDetails() {
    this.titleDatacenter = "Data Center Details";
    this.datacenterService.getDatacenterDetails(this.datacenterId).subscribe(datacentervalue => {
      this.datacenterallValues = <Datacenterdetails>datacentervalue;
      this.details = {
        'Data Center Name': this.datacenterallValues.name,
        "Portal URL": this.datacenterallValues.portalUrl,
        'Support Email': this.datacenterallValues.supportEmail,
        'Cage': this.datacenterallValues.cage,
        'Customer Id': this.datacenterallValues.customerId,
        'WorkPhone': this.datacenterallValues.workPhone
      }

      this.configuration = {
        'RackType ID': this.datacenterallValues.rackTypeID,
        "Powertype ID": this.datacenterallValues.powertypeId,
        'Is BioMetric': (this.datacenterallValues.isBioMetric == false) ? "No" : "Yes",
        'Is Camera': (this.datacenterallValues.isCamera == false) ? "No" : "Yes",
        'Is Complaince': (this.datacenterallValues.isComplaince == false) ? "No" : "Yes",
        'Is Noncomplaince': (this.datacenterallValues.isNoncomplaince == false) ? "No" : "Yes",
        'MaximumPods Compliance': this.datacenterallValues.maximumPodsCompliance,
        'MaximumPods Noncompliance': this.datacenterallValues.maximumPodsNoncompliance
      }

      this.addressDetails = {
        'Address1': this.datacenterallValues.address.address1,
        'Address2': this.datacenterallValues.address.address2,
        'City Name': this.datacenterallValues.address.cityView.cityName,
        'State Name': this.datacenterallValues.address.cityView.stateView.stateName,
        'Country Name': this.datacenterallValues.address.cityView.stateView.countryView.countryName,
        'Zip Code': this.datacenterallValues.address.zipCode,
        'Airport Code': this.datacenterallValues.airportCode
      }
    });

  }



  backTodetails() {
    this.detailsDatacenterStatus = true;
    this.updateDatacenterFormStatus = false;
    this.loadDatacenterDetails();
  }

  createDatacenter() {
    this.updateBtnstatus = false;
    this.detailsDatacenterStatus = false;
    // Validations
    const regUrl = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    const emailExpress = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    const datacenternameText = '^[A-Za-z0-9.\d\s_-]+$';
    const numberOnly = '^[0-9]*$';
    const alphabetonly = '^[a-zA-Z]+$';

    // Form Groups
    this.ft = this.formBuilder.group({
      name: [this.datacenterDetails && this.datacenterDetails.name, [Validators.pattern(datacenternameText)]],
      customerId: [this.datacenterDetails && this.datacenterDetails.customerId],
      portalUrl: [this.datacenterDetails && this.datacenterDetails.portalUrl, [Validators.required, Validators.pattern(regUrl)]],
      supportEmail: [this.datacenterDetails && this.datacenterDetails.supportEmail,
      [Validators.required, Validators.pattern(emailExpress)]],
      cage: [this.datacenterDetails && this.datacenterDetails.cage, [Validators.required, Validators.pattern(numberOnly)]],
      workPhone: [this.datacenterDetails && this.datacenterDetails.workPhone, [Validators.required]]
    });
    this.sd = this.formBuilder.group({
      rackTypeID: [this.datacenterDetails && this.datacenterDetails.rackTypeID && this.datacenterDetails.rackTypeID.id],
      rackTypeName: [this.datacenterDetails && this.datacenterDetails.rackTypeID && this.datacenterDetails.rackTypeID.name],
      powertypeId: [this.datacenterDetails && this.datacenterDetails.powertypeId, [Validators.required, Validators.pattern(numberOnly)]],
      powertypeName: [this.datacenterDetails && this.datacenterDetails.powertypeId && this.datacenterDetails.powertypeId.name],
      isBioMetric: [this.datacenterDetails && this.datacenterDetails.isBioMetric],
      isCamera: [this.datacenterDetails && this.datacenterDetails.isCamera],
      isComplaince: [this.datacenterDetails && this.datacenterDetails.isComplaince],
      isNoncomplaince: [this.datacenterDetails && this.datacenterDetails.isNoncomplaince],
      maximumPodsCompliance: [this.datacenterDetails && this.datacenterDetails.maximumPodsCompliance],
      maximumPodsNoncompliance: [this.datacenterDetails && this.datacenterDetails.maximumPodsNoncompliance],

    });

    this.sd.get('isComplaince').setValidators(this.validateCompliantEnv(this.sd));
    this.sd.get('isNoncomplaince').setValidators(this.validateCompliantEnv(this.sd))

    this.th = this.formBuilder.group({
      address1: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.address1],
      address2: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.address2],
      cityId: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.cityView
        && this.datacenterDetails.address.cityView.cityId],
      stateId: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.cityView
        && this.datacenterDetails.address.cityView.stateView && this.datacenterDetails.address.cityView.stateView.stateId],
      countryId: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.cityView
        && this.datacenterDetails.address.cityView.stateView
        && this.datacenterDetails.address.cityView.stateView.countryView &&
        this.datacenterDetails.address.cityView.stateView.countryView.countryId],
      zipCode: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.zipCode],
      airportCode: [this.datacenterDetails && this.datacenterDetails.airportCode, [Validators.required, Validators.pattern(alphabetonly)]],
      dCenterNotationId: [this.datacenterDetails && this.datacenterDetails.dCenterNotationId]
    });


    // this.datacenterService.getDatacenterDetails(this.datacenterId).subscribe(datacentervalue=> {
    //   this.datacenterDetails = <Datacenterdetails>datacentervalue;

    //   let datacenterDetails = { ...this.datacenterDetails, ...this.datacenterDetails.rackTypeID,
    //    ...this.datacenterDetails.address, ...this.datacenterDetails.address.cityView, 
    //    ...this.datacenterDetails.address.cityView.stateView, ...this.datacenterDetails.address.cityView.stateView.countryView }

    //   });

    // get Country on load
    this.datacenterService.getCountry().subscribe((country: countryView) => {
      this.countryList = country;
    })

    // RackType ID
    this.datacenterService.getrackType().subscribe(rackupdate => {
      this.rackTypevalues = rackupdate;
    });

    // PowerType ID
    this.datacenterService.getpowerType().subscribe(powerType => {
      this.powerTypevalues = powerType;
    })


  }

  get firstForm() {
    return this.ft.controls;
  }



  /*
   * Used to prefield data to datacenter detail page
   */
  updateDatacenterDetails() {
    this.updateDatacenterFormStatus = true;
    this.detailsDatacenterStatus = false;
    this.updateBtnstatus = true;
    this.titleDatacenter = "Update Data Center";
    // Validations
    const regUrl = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    const emailExpress = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    const datacenternameText = '^[A-Za-z0-9.\d\s_-]+$';
    const numberOnly = '^[0-9]*$';
    const alphabetonly = '^[a-zA-Z]+$';
    const dzPhoneNUmber = '/^[+]{1,1}[0-9\-]+$/';


    // Form Groups
    this.ft = this.formBuilder.group({
      name: [this.datacenterDetails && this.datacenterDetails.name, [Validators.required, Validators.pattern(datacenternameText)]],
      customerId: [this.datacenterDetails && this.datacenterDetails.customerId],
      portalUrl: [this.datacenterDetails && this.datacenterDetails.portalUrl, [Validators.required, Validators.pattern(regUrl)]],
      supportEmail: [this.datacenterDetails && this.datacenterDetails.supportEmail,
      [Validators.required, Validators.pattern(emailExpress)]],
      cage: [this.datacenterDetails && this.datacenterDetails.cage, [Validators.required, Validators.pattern(numberOnly)]],
      workPhone: [this.datacenterDetails && this.datacenterDetails.workPhone, [Validators.required]]
    });
    this.sd = this.formBuilder.group({
      rackTypeID: [this.datacenterDetails && this.datacenterDetails.rackTypeID && this.datacenterDetails.rackTypeID.id],
      rackTypeName: [this.datacenterDetails && this.datacenterDetails.rackTypeID && this.datacenterDetails.rackTypeID.name],
      powertypeId: [this.datacenterDetails && this.datacenterDetails.powertypeId, [Validators.required, Validators.pattern(numberOnly)]],
      powertypeName: [this.datacenterDetails && this.datacenterDetails.powertypeId && this.datacenterDetails.powertypeId.name],
      isBioMetric: [this.datacenterDetails && this.datacenterDetails.isBioMetric],
      isCamera: [this.datacenterDetails && this.datacenterDetails.isCamera],
      isComplaince: [this.datacenterDetails && this.datacenterDetails.isComplaince],
      isNoncomplaince: [this.datacenterDetails && this.datacenterDetails.isNoncomplaince],
      maximumPodsCompliance: [this.datacenterDetails && this.datacenterDetails.maximumPodsCompliance],
      maximumPodsNoncompliance: [this.datacenterDetails && this.datacenterDetails.maximumPodsNoncompliance],

    });


    this.sd.get('isComplaince').setValidators(this.validateCompliantEnv(this.sd));
    this.sd.get('isNoncomplaince').setValidators(this.validateCompliantEnv(this.sd))

    this.th = this.formBuilder.group({
      address1: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.address1],
      address2: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.address2],
      cityId: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.cityView
        && this.datacenterDetails.address.cityView.cityId],
      stateId: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.cityView
        && this.datacenterDetails.address.cityView.stateView && this.datacenterDetails.address.cityView.stateView.stateId],
      countryId: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.cityView
        && this.datacenterDetails.address.cityView.stateView
        && this.datacenterDetails.address.cityView.stateView.countryView &&
        this.datacenterDetails.address.cityView.stateView.countryView.countryId],
      zipCode: [this.datacenterDetails && this.datacenterDetails.address && this.datacenterDetails.address.zipCode],
      airportCode: [this.datacenterDetails && this.datacenterDetails.airportCode, [Validators.required, Validators.pattern(alphabetonly)]],
      dCenterNotationId: [this.datacenterDetails && this.datacenterDetails.dCenterNotationId]
    });

    // Pathch All datafields for Data center

    this.datacenterService.getDatacenterDetails(this.datacenterId).subscribe(datacentervalue => {
      this.datacenterDetails = <Datacenterdetails>datacentervalue;

      const datacenterDetails = {
        ...this.datacenterDetails, ...this.datacenterDetails.rackTypeID,
        ...this.datacenterDetails.address, ...this.datacenterDetails.address.cityView,
        ...this.datacenterDetails.address.cityView.stateView, ...this.datacenterDetails.address.cityView.stateView.countryView
      }

      this.ft.patchValue(this.datacenterDetails);
      this.sd.patchValue(this.datacenterDetails);
      this.th.patchValue(datacenterDetails);

      // this.datacenterService.getState(this.datacenterDetails.address.cityView.stateView.countryView.countryId).subscribe(state=> {
      //   this.stateList = state;
      // })  


      // get Country on load
      this.datacenterService.getCountry().subscribe((country: countryView) => {
        this.countryList = country;
      })

      // RackType ID
      this.datacenterService.getrackType().subscribe(rackupdate => {
        // this.rackTypevalues = rack;
        this.rackTypevalues = rackupdate;
        for (const key in rackupdate) {
          if (rackupdate.hasOwnProperty(key)) {
            const element = rackupdate[key];
            if (element.id == this.datacenterDetails.rackTypeID) {
              this.sd.get('rackTypeName').patchValue(element.name);
            }
          }
        }
      });

      // PowerType ID
      this.datacenterService.getpowerType().subscribe(powerType => {
        this.powerTypevalues = powerType;
        for (const key in powerType) {
          if (powerType.hasOwnProperty(key)) {
            const element = powerType[key];
            if (element.id == this.datacenterDetails.powertypeId) {
              this.sd.get('powertypeName').patchValue(element.name);
            }
          }
        }
      })
    })

  }

  onPowerTypeId() {
    const complaine = this.sd.get("isComplaince").value ? true : false;
    const nonComplaine = this.sd.get("isNoncomplaince").value ? true : false;
    if ((!complaine && !nonComplaine)) {
      this.validCompliance = true;
      this.sd.controls.isComplaince.setErrors({ invalid: true });
    } else {
      this.validCompliance = false;
      this.sd.controls.isComplaince.setErrors(null);
    }
  }

  /*
  * Filter Method to filter datacenter city
  */
  filterCity(name: any): cityView[] {
    return this.cityList.filter(option => {
      return name ? option.cityName.indexOf(name) > -1 : option;
    });
  }

  /*
  * Filter Method to display cityName of datacenter
  */
  displayWithCityName() {
    let self = this;
    return function (selectedCity?: cityView) {
      self.selectedCity = selectedCity;
      return selectedCity ? selectedCity.cityName : undefined;
    }
  }

  /*
  * Filter Method to filter Zipcode of datacenter
  */
  filterZipcode(name: string) {
    return this.selectedCity.zipcode.filter(option => {
      if (option) {
        return name ? option.indexOf(name) > -1 : option;
      }
    });
  }


  /*** 
   * Getter method for forms 
   * use to get access of control on template for corrisponding form
   */

  get portalUrl() { return this.ft.get('portalUrl') };
  get supportEmail() { return this.ft.get('supportEmail') };
  get cage() { return this.ft.get('cage') };
  get maximumPodsCompliance() { return this.sd.get('maximumPodsCompliance') };
  get maximumPodsNoncompliance() { return this.sd.get('maximumPodsNoncompliance') };
  get isNoncomplaince() { return this.sd.get('isNoncomplaince') };
  get isComplaince() { return this.sd.get('isComplaince') };
  get airportCode() { return this.th.get('airportCode') };
  get name() { return this.ft.get('name') };

  get zipCode() { return this.th.get('zipCode') };



  /*
 * Method to validate compience and Non complience 
 */
  validateCompliantEnv(sd: FormGroup) {
    const numberOnly = '^[0-9]*$';
    return () => {
      const complaine = sd.get("isComplaince").value ? true : false;
      const nonComplaine = sd.get("isNoncomplaince").value ? true : false;

      if (complaine) {
        sd.get('maximumPodsCompliance').setValidators([Validators.required, Validators.pattern(numberOnly)]);
        sd.get('maximumPodsCompliance').updateValueAndValidity();


      } else {
        sd.get('maximumPodsCompliance').clearValidators();
        sd.get('maximumPodsCompliance').updateValueAndValidity();
      }

      if (nonComplaine) {
        sd.get('maximumPodsNoncompliance').setValidators([Validators.required, Validators.pattern(numberOnly)]);
        sd.get('maximumPodsNoncompliance').updateValueAndValidity();

      } else {
        sd.get('maximumPodsNoncompliance').clearValidators();
        sd.get('maximumPodsNoncompliance').updateValueAndValidity();
      }

      return null;
    }

  }

  /*
 * Method to get state list on country Id
 */

  onChangeCountry(eventcountry: any) {
    if (eventcountry) {
      this.datacenterService.getState(eventcountry).subscribe(state => {
        this.stateList = state;
      })
    }
  }

  onChangeRacktype(eventRack: any) {
    //  console.log(eventRack);
  }

  /*
 * Method to get City list on state Id
 */

  onChangeStateChange(eventstate: any) {
    // console.log(eventstate);

    if (eventstate) {
      this.datacenterService.getCity(eventstate).subscribe(city => {
        this.cityList = city;
        if (this.datacenterDetails.id) {
          this.selectedCity = (this.cityList.filter((city: cityView) => city.cityId == this.datacenterDetails.address.cityView.cityId))[0];
          this.th.get('cityId').patchValue(this.selectedCity);
        }


        this.filteredOptions = this.th.get('cityId').valueChanges
          .pipe(
            startWith('' as string),
            map(name => name ? this.filterCity(name) : this.cityList.slice())
          );

        this.filterOptionsZip = this.th.get("zipCode").valueChanges
          .pipe(
            startWith(''),
            map(name => name ? this.filterZipcode(name) : [])
          )
      });
    }
  }

  /*
  * Method to update Full datacenter form
  */

  updateDatacenterdata() {

    this.datacenterUpdateForm = { ...this.ft.value, ...this.sd.value, ...this.th.value };
    this.datacenterUpdateForm['id'] = this.datacenterDetails.id;
    this.datacenterUpdateForm['cityId'] = this.datacenterUpdateForm.cityId.cityId;
    this.datacenterUpdateForm['address'] = { ...this.datacenterDetails.address }
    this.datacenterUpdateForm['addressId'] = this.datacenterUpdateForm.address.addressId;
    delete this.datacenterUpdateForm['address'];

    this.datacenterService.updateDatacenter(this.datacenterUpdateForm).subscribe(data => {
      // console.log(data);
      // this.router.navigate(['/console/datacenter-list/'], { relativeTo: this.activatedRoute } );
      this.backTodetails()
      // this.router.navigate(['/console/datacenter-list/',data.id,'configure','datacenter-details'], { relativeTo: this.activatedRoute } );
    });

  }

  saveDatacenterdata() {
    this.datacenterUpdateForm = { ...this.ft.value, ...this.sd.value, ...this.th.value };
    // this.datacenterUpdateForm['id'] = this.datacenterDetails.id;
    this.datacenterUpdateForm['cityId'] = this.datacenterUpdateForm.cityId.cityId;
    this.datacenterUpdateForm['address'] = { ...this.datacenterDetails.address }
    this.datacenterUpdateForm['addressId'] = this.datacenterUpdateForm.address.addressId;
    this.datacenterUpdateForm['rackTypeName'] = "Testrack";
    this.datacenterUpdateForm['powertypeName'] = "TestPower";
    this.datacenterUpdateForm['workPhone'] = this.datacenterUpdateForm.workPhone.replace(/[&\/\\#,()$~%.'":*?<>{}]/g, '');
    delete this.datacenterUpdateForm['address'];

    // console.log(this.datacenterUpdateForm, "Save");

    this.datacenterService.saveDatacenter(this.datacenterUpdateForm).subscribe(data => {
      // console.log(data);
      if (data) {
        this.toastyService.success('Record updated successfully');
      }
      if (!data) {
        this.toastyService.error('Process failed, please try again');
      }
      this.router.navigate(['/console/datacenter-list/', data.id, 'configure', 'datacenter-details'], { relativeTo: this.activatedRoute });
    });

  }


}

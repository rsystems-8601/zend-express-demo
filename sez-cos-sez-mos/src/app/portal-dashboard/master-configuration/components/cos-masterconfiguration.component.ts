import { Component, OnInit, Inject } from '@angular/core';
// import { Role } from "../../../dto/role.model";
// import { RoleService } from "../../../services/role.service";
// import { AuthHolderService } from "../../../services/auth-holder.service";
// import { CosEditMasterconfigurationComponent } from "./cos-edit-masterconfiguration/cos-edit-masterconfiguration.component";
// import {Observable} from "rxjs";
// import { map } from 'rxjs/operators';


// Models and Services for Partner
// import { Partner } from "../../models/partner.model";
// import { PartnerService } from '../../services/partner.service';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { OrganizationService } from '../../../services/organization.service';
import { MasterconfigurationService } from '../services/masterconfiguration.service';
import { MasterConfiguration, sectionGlobalvar } from '../../../models/masterconfiguration.model';


@Component({
  templateUrl: './cos-masterconfiguration.component.html',
  styles: [`
     .masterconfig { padding: 20px 20px 30px 30px;background: #fff;width: 1100px;position: relative;display: block;left: 30px;border: 1px solid #ddd;
      margin: 0 auto; }
      .podvarstable { width: 100%;display: block;padding: 10px;float: left;position: relative; border-bottom: 1px solid #ddd;}
      .tittle {float: left;width: 40%;display: block;position: relative;top: -7px;}
      .addbtn {display: block;float: right;width: 50%;position: relative;right: 0; margin: 10px 0 0 0;text-align: right;}
      .tittle1 {float: left;width: 40%;display: block;position: relative;top: -7px;}
      .addbtn1 {display: block;float: right;width: 50%;position: relative;right: 0; margin: 5px 11px 0 0;text-align: right;}
      .addnew {background: #17787b;padding: 5px 8px 5px 9px;width: auto;height: 36px;font-size: 12px;font-weight: 500;}
      .tittle1 h3 {font-size: 18px;padding: 5px 0 0 10px;}
      .textboxdiv { width: 50%;float: left; display: block;position: relative;padding: 10px;border: 1px solid #ddd;}
      .textbox_button { width: 100%;float: left; display: block; margin: 20px 0 0 0; }
      .buttondiv { float: left;position: relative;width: 40%;top: 3px;left: 29px;}
      .tittle h2 { font-size: 19px; }
  `]
})


export class CosMasterconfigurationComponent {

  editmasterconfigForm: FormGroup;
  // organizationRoles: Role[] = [];
  // complient: any;
  // viewButton: boolean = false;
  // jobid: number;
  // dvPortdata: any[];
  // nameArray: FormArray;
  globalvarData: MasterConfiguration;
  sectionGlobaldata: sectionGlobalvar[];
  sectionname: sectionGlobalvar;
  sectionData: string[];
  showSectiontextbox: boolean = false;
  removeButton: boolean = false;
  addButton: boolean = true;
  sectionValues: any[];
  id: any;
  vpnIP: any;
  formBuilder: FormBuilder;
  masterconfigService: MasterconfigurationService;

  constructor(
    // public organizationService: OrganizationService,
    public msc: MasterconfigurationService,
    // public roleService: RoleService,
    // public auth: AuthHolderService,
    public fb: FormBuilder) {

      this.masterconfigService = msc;
      this.formBuilder = fb;
    }

    ngOnInit() {

    this.editmasterconfigForm = this.formBuilder.group({
      gitHubUrl: [],
      gitHubKey: [],
      gitPassword: [],
      globalVars: this.formBuilder.array([]),
      sectionVars: this.formBuilder.array([])
    });

    // Fetching All data
    this.masterconfigService.getMasterconfiguration().subscribe(data => {
      this.id = data.id;
      this.vpnIP = data.vpnIP;
      this.globalvarData = data;

      // Gloval vars
      this.globalvarData.globalVars = JSON.parse(data.globalVars.toString());

      // Section Global vars
      this.sectionGlobaldata = JSON.parse(data.sectionwiseGlobalVars.toString());

      this.sectionData = this.sectionGlobaldata.map(rec => rec.sectionName);
      var allData = [];
      for(let i = 0; i < this.sectionGlobaldata.length; i++) {
        for(let j =0; j < this.sectionGlobaldata[i].keys.length; j++) {
            let dataUnit = {'sectionName': this.sectionGlobaldata[i].sectionName, 'key': this.sectionGlobaldata[i].keys[j], 'value': this.globalvarData.globalVars[this.sectionGlobaldata[i].keys[j]]};
            allData.push(dataUnit);
          }
      }
      this.sectionValues = allData;
      console.log('this.allData : ' + JSON.stringify(this.sectionValues));

      // Seting form default value on load
      this.editmasterconfigForm.get('gitHubUrl').setValue(this.globalvarData.gitHubUrl);
      this.editmasterconfigForm.get('gitPassword').setValue(this.globalvarData.gitPassword);
      this.editmasterconfigForm.get('gitHubKey').setValue(this.globalvarData.gitHubKey);

      // Fetching all sectionWiseGlobalvars
      for (let k = 0; k < this.sectionValues.length; k++) {
        (<FormArray>this.editmasterconfigForm.get('sectionVars')).push(this.formBuilder.group({
          key: [this.sectionValues[k].key],
          value: [this.sectionValues[k].value],
          sectionName: [this.sectionValues[k].sectionName],
        }))
      }
    });

  }

  get getJobVars() {
    return this.editmasterconfigForm.controls.sectionVars as FormArray;
  }

  addSection() {
    this.showSectiontextbox = true;
    this.removeButton = true;
    this.addButton = false;
  }

  // Add/Push section name
  addsectionValue(value: any) {
    console.log(value);
    this.sectionData.push(value);
    this.addButton = true;
    this.removeButton = false;
    this.showSectiontextbox = false;
  }

  // Close section
  removeSection() {
    this.showSectiontextbox = false;
    this.removeButton = false;
    this.addButton = true;
  }

  // get getcontrolVars() {
  //   return this.editmasterconfigForm.get('globalVars').controls;
  // }

  get formData() { return <FormArray>this.editmasterconfigForm.get('sectionVars'); }


  createPodvars(): FormGroup {
    return this.formBuilder.group({
      key: [],
      value: []
    });
  }

  addPodvar() {
    const podVars = this.editmasterconfigForm.get('sectionVars') as FormArray;
    podVars.push(this.createPodvars());
  }

  removeRow(index) {
    const podVars = this.editmasterconfigForm.get('sectionVars') as FormArray;
    podVars.removeAt(index);
  }

  getGlobalVars(form){
    let globalVars =  {};
    for (let sectionVar of form.sectionVars) {
      if(sectionVar.key != null)
        globalVars[sectionVar.key] = sectionVar.value;
    }

    return globalVars;

  }

  getSectionWiseGlobalVars(form) {
    let sectionWiseGlobalVars = [];
    const sections = [...new Set(form.sectionVars.map(item => item.sectionName))];
    for(let sectionValue of sections) {
      let item = new Object();
      item['sectionName'] = sectionValue;
      item['keys'] = [];
      for(let x of form.sectionVars) {
        if(x.sectionName == sectionValue) {
          if(x.key != null)
            item['keys'].push(x.key);
        }
      }
      sectionWiseGlobalVars.push(item);
    }
    return sectionWiseGlobalVars;
  }

  savePoddata() {
    let form = this.editmasterconfigForm.value;
    console.log(form);

    let requestData = {
      id: this.id,
      gitHubUrl: form.gitHubUrl,
      gitHubKey: form.gitHubKey,
      gitPassword: form.gitPassword,
      globalVars: JSON.stringify(this.getGlobalVars(form)),
      sectionwiseGlobalVars: JSON.stringify(this.getSectionWiseGlobalVars(form)),
      vpnIP: this.vpnIP
    }

    console.log('requestData : ' + JSON.stringify(requestData));

    this.masterconfigService.createUpdate(requestData).subscribe(data => {
      console.log('master configuration service upadate response : ' + JSON.stringify(data));
    }, err =>{
      console.log('master configuration service upadate Error : ' + JSON.stringify(err));
    });

  }


}
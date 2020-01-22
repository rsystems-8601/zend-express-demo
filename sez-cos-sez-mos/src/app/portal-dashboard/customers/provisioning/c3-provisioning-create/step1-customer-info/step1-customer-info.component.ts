import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationCosmosService } from 'src/app/services/organization-cosmos.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserRole } from 'src/app/models/provisioning/provision-user-role.model';
import { C3ValidatorPattern } from 'src/app/shared/c3-validator-pattern-class';
import { C3ProvisioningService } from '../../c3-provisioning.service';


@Component({
  selector: 'app-step1-customer-info',
  templateUrl: './step1-customer-info.component.html',
  styleUrls: ['./step1-customer-info.component.scss']
})
export class Step1CustomerInfoComponent implements OnInit {
  public step1From: FormGroup;
  public userRoles:UserRole = new UserRole();
  public addressContactType = [];
  @ViewChild("fileUploadInput", {static:false}) fileUploadInput;

  constructor(
    public organizationService: OrganizationCosmosService, 
    public fb: FormBuilder,
    private provisionService: C3ProvisioningService
  ) { 
    console.log('******',this.userRoles)
    this.getAddressContactType();
    this.initForm();
    
  }

  ngOnInit() {
    this.step1From.get('customer').get('custId').valueChanges
    .subscribe(rec => {
      this.getRoleUser(rec.organizationId)
      this.step1From.get('address').patchValue(rec.address)
    } );

    this.step1From.get('fileControl').valueChanges
    .subscribe(rec => {
      console.log(this.fileUploadInput.nativeElement.files[0])
    } );
  }

  initForm(){
    this.step1From = this.fb.group({
      customer: this.fb.group({
        custId: ['',[Validators.required]]
      }),
      customerContacts: this.fb.array([this.customerContactFormGroup()]),
      address: this.getAddrees(),
      projectName:['', [Validators.required, Validators.pattern(C3ValidatorPattern.alphanumericText)]],
      contractPath:['',Validators.required],
      contractExecutionDate:['',Validators.required],
      contractDueDate:['',Validators.required],
      salesUserId:['',Validators.required],
      salesEngineerUserId:['',Validators.required],
      projectCoordinatorUserId:['',Validators.required],
      loeUserId:[],
      vsaUserId: [],
      vseUserId:[],
      crmUserId:[],
      sdmUserId:[],
      engineerUserId:[],
      fileControl:[]
    });
  }



  searchCustomer = (name: string) => {
    console.log(name)
    var orFilter:{}
    if(name)
     orFilter={
        "firstName":name,
        "lastName" :name
    }
      let userFilter = { 
        "orfilter":{},
        "andfilter":{
          "tenantTypeId": 8
        },
        "ascSorting":[],
        "descSorting":[],
        "pageNo":"1",
        "recordsPerPage":"10"
      }

    return this.organizationService.getOrganizations(userFilter)
           .pipe(map(page => page.data))
  };

  customerSelected(customer){
    console.log(customer);
    this.getRoleUser(customer.organizationId);
  }

  getRoleUser(orgId){
    this.organizationService.getRoleUser(orgId)
          .subscribe(rec => {
            console.log(rec);
            this.userRoles = rec;
          })
  }

  getAddressContactType(){
    this.provisionService.getProvisoningContactType()
    .subscribe(contactType => {
      this.addressContactType = contactType;
    })
  }

  getAddrees(): FormGroup{
   return  this.fb.group({
      addressId:[],
      address1:['' ,[Validators.required]],
      address2: [],
      cityView: this.getCityViewGroup(),
      zipCode:['' ,[Validators.required]]
    })
  }

  getCityViewGroup(): FormGroup{
    return this.fb.group({
      cityId:['' ,[Validators.required]],
      cityName: [],
      stateView: this.getStateViewGroup()
    });
  }

  getStateViewGroup(): FormGroup{
    return this.fb.group({
      stateId: ['' ,[Validators.required]],
      stateName: [],
      countryView: this.getCountryGroup()
    })
  }

  getCountryGroup(): FormGroup{
   return  this.fb.group({
      countryId:['' ,[Validators.required]],
      countryName: []
    })
  }

  customerContactFormGroup(): FormGroup {
    return this.fb.group( {
      id:[],
      contactType: ['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      name:[null],
      email:['',[Validators.required,Validators.email]],
      phone:[],
      formattedPhoneNum:[],
      isDelete:[],
      contactId:[],
      customerPortalId:[],
      fullName:[]
    })
  }

  customerContractType(): FormGroup{
    return this.fb.group({
      id: [],
      typeName: []
    })
  }

  addNewCustomerContact(){
    this.customerContact.push(this.customerContactFormGroup());
  }

  removeCustomerContact(index){
    if(this.customerContact.controls.length == 1){
        return false;
    }
    this.customerContact.removeAt(index);
  }

  get customerContact(){
      return this.step1From.get('customerContacts') as FormArray;
  }

  saveStep1(){
    console.log('******',this.step1From.value)
  }
}

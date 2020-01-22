import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import * as _ from "lodash";
import { Observable, of, Subject } from "rxjs";
import { map} from 'rxjs/operators';
import { OrganizationService } from 'src/app/services/organization.service';
import { OrganizationType, Organization } from 'src/app/models/organization.model';
import { UserService } from '../../user/user.service';
import { RoleService } from 'src/app/services/role.service';
import { ApplicationService } from '../../application/application.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { ToastyService } from 'ngx-toasty';
import { TranslateService } from '@ngx-translate/core';
import { DzValidators } from 'src/app/common/dz-validators';
import { StatusService } from 'src/app/services/status.service';
import { countryView, stateView, cityView } from 'src/app/models/address1.model';
import { OrganizationCosmosService } from 'src/app/services/organization-cosmos.service';
import { User } from 'src/app/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableSharedService } from 'src/app/shared/data-table/data-table.service';

@Component({ templateUrl: "./dz-edit-organization.component.html" })
export class DzEditOrganizationComponent {
    //  {type:"MDCO",val:5}, {type:"DCO",val:6}, 
    types: Object[] = [{ type: "PARTNER", val: 7 }, { type: "CUSTOMER", val: 8 }];
    ticketingStates: string[] = ["ENABLED", "DISABLED", "READONLY"];

    ft: FormGroup;
    sd: FormGroup;
    th: FormGroup;
    fr: FormGroup;
    fth: FormGroup;
    allCountry: countryView[] = [];
    allStates: stateView[] = [];
    allCities: cityView[] = [];
    allZipcodes: String[] = [];
    users: User[] = [];
    orgForm: any;
    pageTitle = "Add Organization";
    form: FormGroup;
    hideParentOrganization: boolean;
    organization: Organization;
    public selectedType: number;
    public allPartners: Organization[] = [];
    public allParents: Organization[] = []
    searchParentOrganizations = (name: string) => {
        // return this.organizationService.organizationsSearchFunction(name).pipe(map(orgs => orgs.filter(org =>
        //     OrganizationType[org.type] !== OrganizationType.PORTAL_ADMIN &&
        //     OrganizationType[org.type] !== OrganizationType.CUSTOMER)
        // ));
    };
    searchSupportManagers = (name: string) => {
        var orFilter: {}
        if (name)
            orFilter = {
                "firstName": name,
                "lastName": name
            }
        let userFilter = {
            "orfilter": orFilter,
            "andfilter": {
                "organization": {
                    "tenantTypeId": 5
                }
            },
            "ascSorting": [],
            "descSorting": [],
            "pageNo": "1",
            "recordsPerPage": "5"

        }
        return this.organizationService.getUsers(userFilter)
            .pipe(map(page => page.data))

    };
    searchOrganizationApplications = (name: string) => this.applicationService.organizationAppShortInfoSearchFunction(this.organization.id, name);

    constructor(
        //  public dialogRef: MatDialogRef<DzEditOrganizationComponent>,
        public organizationService: OrganizationCosmosService,
        public userService: UserService,
        public roleService: RoleService,
        public applicationService: ApplicationService,
        public statusService: StatusService,
        public auth: AuthHolderService,
        public toasty: ToastyService,
        public translateService: TranslateService,
        public formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private dataTableService: DataTableSharedService
    ) {

        // let uniqueCustomerIdValidator = DzValidators.asyncUnique(customerId =>
        //     this.organizationService.checkCustomerIdUnique(customerId), this.organization && this.organization.customerId
        // );
        // let uniqueNameValidator = DzValidators.asyncUnique(name =>
        //     this.organizationService.checkNameUnique(name), this.organization && this.organization.name
        // );
        this.organizationService.getCountry().
            subscribe((data => {
                this.allCountry = data;

            }))
        this.organizationService.getUsers(this.userFilter)
            .subscribe((response => {
                this.users = response.data;

                this.route.params
                    .subscribe(param => {
                        console.log(param);
                        if (this.dataTableService.getRowData && param.id) {
                            this.organization = this.dataTableService.getRowData;
                            console.log("on edit data==>>", this.organization);
                            this.initForm();
                        } else if (param.id) {
                            this.router.navigate(['../'], { relativeTo: this.route })
                        } else {
                            //this.initForm();
                        }
                    })

            }))



        // TODO toasty is shown under the dialog backdrop
        let toastIds: { [msg: string]: number } = {};
        let supportContactPhoneValidator = (errorMsg: string) => DzValidators.predicate(user => {
            if (user && !(user.workPhoneNumber || user.mobilePhoneNumber)) {
                translateService.get(errorMsg).subscribe(msg => toasty.error({
                    title: msg,
                    timeout: 0,
                    onAdd: toast => toastIds[errorMsg] = toast.id
                }));
                return false;
            } else {
                toastIds[errorMsg] && toasty.clear(toastIds[errorMsg]);
                return true;
            }
        });
        // this.form = this.formBuilder.group({
        //     customerId: [this.organization && this.organization.customerId, [], uniqueCustomerIdValidator],
        //     name: [this.organization && this.organization.name, [], uniqueNameValidator],
        //     parentOrganization: [{
        //         value: this.organization && this.organization.parentInfo,
        //         //disabled: organization
        //     }],
        //     type: [{
        //         value: this.organization && this.organization.type,
        //         disabled: this.organization
        //     }],
        //     status: [this.organization && statusService.statusOf(this.organization.enabled)],
        //     ticketing: [this.organization && this.organization.ticketing],
        //     supportPhoneNumber: [this.organization && this.organization.supportPhoneNumber],
        //     customerRelationshipManager: [this.organization && this.organization.customerRelationshipManager, supportContactPhoneValidator("crmNoPhoneError")],
        //     serviceDeliveryManager: [this.organization && this.organization.serviceDeliveryManager, supportContactPhoneValidator("sdmNoPhoneError")],
        //     starredApplications: [{
        //         value: this.organization && this.organization.starredApplications,
        //         disabled: !this.organization
        //     }],
        //     compliant: [this.organization ? this.organization.compliant : true],
        //     twoFactorAuth: [this.organization ? this.organization.twoFactorAuth : true]
        // });
        // if (this.organization && this.organization.parentInfo) {
        //     organizationService.getOrganization(this.organization.parentInfo.id)
        //     .subscribe((parentOrg) => {
        //         this.form.controls['parentOrganization'].setValue(parentOrg);
        //     })
        // }

        this.hideParentOrganization = auth.getOrganizationType() !== OrganizationType.PORTAL_ADMIN && auth.getOrganizationType() !== OrganizationType.DIZZION;

        //Steppr Form Groups
        if (!this.organization) {
            this.ft = this.formBuilder.group({
                shortName: ['', [Validators.required]],
                name: ['', [Validators.required]],
                tenantTypeId: ['', [Validators.required]],
                parentId: ['', [Validators.required]],
                partnerId: ['', [Validators.required]],
            });
            this.sd = this.formBuilder.group({
                firstName: ['', [Validators.required]],
                lastName: ['', [Validators.required]],
                email: ['', [Validators.required]],
                mobilePhoneNumber: ['', [Validators.required]],
                workPhoneNumber: ['', [Validators.required]],
            });
            this.th = this.formBuilder.group({
                address1: ['', [Validators.required]],
                address2: ['', [Validators.required]],
                country: ['', [Validators.required]],
                state: ['', [Validators.required]],
                city: ['', [Validators.required]],
                zipCode: ['', [Validators.required]],

            });
            this.fr = this.formBuilder.group({

                serviceDeliveryManager: ['', [Validators.required]],
                customerRelationshipManager: ['', [Validators.required]],
            });
            this.fth = this.formBuilder.group({
                ticketing: ['', [Validators.required]],
                twoFactorAuth: ['', [Validators.required]],
                compliant: ['', [Validators.required]],
            });
        }

    }

    initForm() {
     
        console.log("Organization for update==>>", this.organization)
        if (this.organization.address) {
            this.onCountryChange({ value: this.organization.address.cityView.stateView.countryView.countryId });
            let stateChange = this.onStateChange({ value: this.organization.address.cityView.stateView.stateId });
            stateChange.subscribe(data => {
                this.onCityChange({ value: this.organization.address.cityView.cityId });
            })
        }
        this.onTypeChange({ value: this.organization.tenantTypeId })

        this.onPartnerChange({ value: this.organization.partnerId })

        let sdm: User = this.users.find(x => x.id === this.organization.serviceDeliveryManager);
        let crm: User = this.users.find(x => x.id === this.organization.customerRelationshipManager);


     
        // Form Data
        this.pageTitle = !this.organization ? "addOrganization" : "editOrganization";
      
      console.log("Parent ID==>>",this.organization.parentId)
        this.ft = this.formBuilder.group({
            shortName: [this.organization.shortName, [Validators.required]],
            name: [this.organization.name, [Validators.required]],
            tenantTypeId: [this.organization.tenantTypeId, [Validators.required]],
            parentId: [this.organization.parentId, [Validators.required]],
            partnerId: [this.organization.partnerId],
        });
        this.sd = this.formBuilder.group({
            firstName: [this.organization.firstName, [Validators.required]],
            lastName: [this.organization.lastName, [Validators.required]],
            email: [this.organization.email, [Validators.required]],
            mobilePhoneNumber: [this.organization.mobilePhoneNumber, [Validators.required]],
            workPhoneNumber: [this.organization.workPhoneNumber, [Validators.required]],
        });
        this.th = this.formBuilder.group({
            address1: [this.organization.address.address1, [Validators.required]],
            address2: [this.organization.address.address2, [Validators.required]],
            country: [this.organization.address.cityView.stateView.countryView.countryId, [Validators.required]],
            state: [this.organization.address.cityView.stateView.stateId, [Validators.required]],
            city: [this.organization.address.cityView.cityId, [Validators.required]],
            zipCode: [this.organization.address.zipCode, [Validators.required]],

        });
        this.fr = this.formBuilder.group({

            serviceDeliveryManager: [sdm, [Validators.required]],
            customerRelationshipManager: [crm, [Validators.required]],
        });
        this.fth = this.formBuilder.group({
            ticketing: [this.organization.ticketing, [Validators.required]],
            twoFactorAuth: [this.organization.twoFactorAuth, [Validators.required]],
            compliant: [this.organization.compliant, [Validators.required]],
        });
           // Do something after
         
    }
    userFilter = {
        "orfilter": {},
        "andfilter": {
            "organization": {
                "tenantTypeId": 5
            }
        },
        "ascSorting": [],
        "descSorting": [],
        "pageNo": "1",
        "recordsPerPage": "5"

    }

    save() {
        countryView
        this.orgForm = { ...this.ft.value, ...this.sd.value, ...this.fr.value, ...this.fth.value };
        this.orgForm['address'] = { ...this.th.value }
        this.orgForm['serviceDeliveryManager'] = this.orgForm['serviceDeliveryManager'].id;
        this.orgForm['customerRelationshipManager'] = this.orgForm['customerRelationshipManager'].id;
        console.log("saveeeeeeeeeeeeeeeeeeeeeeeee", this.orgForm)
        if (!this.organization) {
            this.organizationService.create(this.orgForm)
                .subscribe((response => {
                    this.router.navigate(['../'], { relativeTo: this.route });
                }))
        } else {
            this.orgForm['id'] = this.organization.id;
            this.orgForm['cid'] = this.organization.cid;
            this.organizationService.update(this.orgForm)
                .subscribe((response => {
                    this.router.navigate(['../'], { relativeTo: this.route });
                }))
        }


        //     console.log("saveeeeeeeeeeeeeeeeeeeeeeeee",   this.orgForm)
        //     this.toasty.clearAll();
        //     let form = this.form.value;
        //     let request$: Observable<Organization>;
        //     if (this.organization) {
        //         request$ = this.organizationService.updateOrganization(this.organization.id, {
        //             customerId: form.customerId,
        //             name: form.name,
        //             enabled: this.statusService.valueOfStatus(form.status),
        //             ticketing: form.ticketing,
        //             supportPhoneNumber: form.supportPhoneNumber,
        //             customerRelationshipManagerId: form.customerRelationshipManager && form.customerRelationshipManager.id,
        //             serviceDeliveryManagerId: form.serviceDeliveryManager && form.serviceDeliveryManager.id,
        //             starredApplicationIds: form.starredApplications && form.starredApplications.map(app => app.id),
        //             compliant: form.compliant,
        //             twoFactorAuth: form.twoFactorAuth,
        //             parentOrganizationId: (form.parentOrganization && form.parentOrganization.id) || this.organization.parentInfo.id || this.auth.getAuthentication().organizationId
        //         });
        //     } else {
        //         console.log("ddddddddddddd");
        //         request$ = this.organizationService.saveOrganization({
        //             name: form.name,
        //             customerId: form.customerId,
        //             parentOrganizationId: (form.parentOrganization && form.parentOrganization.id) || this.auth.getAuthentication().organizationId,
        //             type: form.type,
        //             enabled: this.statusService.valueOfStatus(form.status),
        //             ticketing: form.ticketing,
        //             supportPhoneNumber: form.supportPhoneNumber,
        //             customerRelationshipManagerId: form.customerRelationshipManager && form.customerRelationshipManager.id,
        //             serviceDeliveryManagerId: form.serviceDeliveryManager && form.serviceDeliveryManager.id,
        //             starredApplicationIds: form.starredApplications && form.starredApplications.map(app => app.id),
        //             compliant: form.compliant,
        //             twoFactorAuth: form.twoFactorAuth
        //         });
        //     }
        //    request$.spinner().subscribe();
    }

    updateTwoFactorAuth(compliant: boolean) {
        if (compliant) {
            this.form.get("twoFactorAuth").setValue(true);
        }
    }

    updateCompliant(twoFactorAuth: boolean) {
        if (!twoFactorAuth) {
            this.form.get("compliant").setValue(false);
        }
    }
    onCountryChange(event) {
        this.organizationService.getState(event.value).
            subscribe((data => {
                this.allStates = data;
            }));
        return this.organizationService.getState(event.value);
    }
    onStateChange(event) {
        let onCityChange = new Subject<any>();
        this.organizationService.getCity(event.value).
            subscribe((data => {
                this.allCities = data;
                onCityChange.next(data);
            }))
        return onCityChange;
    }
    onCityChange(event) {
        let city: cityView = this.allCities.find(x => x.cityId === event.value);
        this.allZipcodes = city.zipcode;
    }
    onTypeChange(event) {

        let typeId: number = event.value;
        this.selectedType = typeId;

        let filter = {
            "orfilter": {},
            "andfilter": {
            },
            "ascSorting": [],
            "descSorting": [],
            "pageNo": "1",
            "recordsPerPage": "10000"
        }
        if (typeId === 8) {
            this.ft.controls['partnerId'].setValidators([Validators.required]);
            this.ft.controls['partnerId'].updateValueAndValidity();
            this.ft.controls['parentId'].setValue("");
            this.ft.controls['parentId'].updateValueAndValidity();
            filter['andfilter']['tenantTypeId'] = typeId - 1;
            this.organizationService.getOrganizations(filter).subscribe((data => {
                this.allPartners = data.data;
            }));
        } else {

            this.ft.controls['partnerId'].setValue("");
            this.ft.controls['parentId'].setValue("");
            this.ft.controls['partnerId'].clearValidators();
            this.ft.controls['partnerId'].updateValueAndValidity();
            this.ft.controls['parentId'].updateValueAndValidity();
        }
        if (typeId === 7) {
            filter['andfilter']['tenantTypeId'] = typeId - 1;
            this.organizationService.getOrganizations(filter).subscribe((data => {
                this.allParents = data.data;
    
            }));
        }
    }

    onPartnerChange(event) {
        if (this.selectedType === 8) {
            let orgId: number = event.value;
            let filter = {
                orfilter: {},
                andfilter: {
                    "parent.id": orgId


                },
                ascSorting: [],
                descSorting: [],
                pageNo: 1,
                recordsPerPage: 10000
            }

            this.organizationService.getOrganizations(filter).subscribe((data => {
                this.allParents = data.data;
            }));
        }
    }
     delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrganizationService } from "../../../../services/organization.service";
import { UserCreateUpdateRequest, UserService } from "../user.service";
import { Role } from "../../../../models/role.model";
import { RoleService } from "../../../../services/role.service";
import { AuthHolderService } from "../../../../services/auth-holder.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DzValidators } from "../../../../common/dz-validators";
import { User } from "../../../../models/user.model";
import { OrganizationCosmosService } from 'src/app/services/organization-cosmos.service';
import { Organization } from 'src/app/models/organization.model';
import { map } from 'rxjs/operators';
import { DataTableSharedService } from 'src/app/shared/data-table/data-table.service';


@Component({ templateUrl: "./dz-edit-user.component.html" })
export class DzEditUserComponent {

    userForm: FormGroup;
    organizationRoles: Role[] = [];

    allRoles: Role[] = [];
    public user: User;
    constructor(
        public organizationService: OrganizationCosmosService,
        public userService: UserService,
        public roleService: RoleService,
        public auth: AuthHolderService,
        public formBuilder: FormBuilder,
        public activatedRoute: ActivatedRoute,
        private router: Router,
        private dataTableService: DataTableSharedService
    ) {

        this.getRoles();
        let id = this.activatedRoute.snapshot.params.id;
        if (this.dataTableService.getRowData && id) {
            this.user = this.dataTableService.getRowData;
            this.initUser();
        } else {
            this.initUser()
        }
    }

    initUser() {
        this.loadForm();
        if (this.user) {
            this.setOrganizationForUpdate().then(rs => this.loadForm())
        }
        if (this.auth.isOrganizationAdmin()) {
            this.updateOrganizationRoles(this.auth.getAuthentication().organizationType);
        } else if (this.user) {
            this.updateOrganizationRoles(this.user.organization.type);
        }
    }
    loadForm() {
       // let uniqueEmailValidator = DzValidators.asyncUnique(email => this.userService.checkEmailUnique(email), this.user && this.user.email);
        this.userForm = this.formBuilder.group({
            firstName: [this.user && this.user.firstName],
            lastName: [this.user && this.user.lastName],
           //  email: [this.user && this.user.email, [], uniqueEmailValidator],
            email: [this.user && this.user.email, []],
            organization: [this.user && this.user.organization],
            roles: [this.user && this.user.roles],
            mobilePhoneNumber: [this.user && this.user.mobilePhoneNumber],
            workPhoneNumber: [this.user && this.user.workPhoneNumber],
        });
    }

    setOrganizationForUpdate() {
        return new Promise((resolve, reject) => {
            let org: Organization;
            let filter = { orfilter: {}, andfilter: {}, ascSorting: [], descSorting: [], pageNo: 1, recordsPerPage: 10000 }
            this.organizationService.getOrganizations(filter)
                .subscribe(data => {
                    let organizations: any[] = data.data;
                    org = organizations.find(x => x.organizationId === this.user.organization);
                    this.user.organization = org;
                    resolve();
                });
        });
    }

    saveUser() {
        let form = this.userForm.value;

        let createUpdateRequest: UserCreateUpdateRequest = {

            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            // organizationId: this.auth.isOrganizationAdmin()
            //     ? this.auth.getAuthentication().organizationId
            //     : form.organization.id,
            organization: form.organization.organizationId,
            roles: form.roles.map(obj => obj.id),
            mobilePhoneNumber: form.mobilePhoneNumber,
            workPhoneNumber: form.workPhoneNumber
        };
        if (this.user)
            createUpdateRequest['id'] = this.user.id;
        let request$ = this.user
            ? this.userService.updateUser(createUpdateRequest)
            : this.userService.saveUser(createUpdateRequest);

        request$.spinner().subscribe(user => {
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        });
    }

    updateOrganizationRoles(organizationType: string) {
        return this.roleService.getRolesAvailableForOrganizationType(organizationType).subscribe(roles => this.organizationRoles = roles);
    }

    cancelStep() {
        this.router.navigate(['../configure'], { relativeTo: this.activatedRoute });
    }

    getRoles() {
        let filter = { orfilter: {}, andfilter: {}, ascSorting: [], descSorting: [], pageNo: 1, recordsPerPage: 10000 }

        this.roleService.getRolesc3(filter).subscribe((data => {
            this.allRoles = data.data;
        }));
    }

    organizationsSearchFunction = (name: string) => {
        var orFilter: {}
        if (name)
            orFilter = { "name": name }
        let filter = { orfilter: orFilter, andfilter: {}, ascSorting: [], descSorting: [], pageNo: 1, recordsPerPage: 10000 }
        return this.organizationService.getOrganizations(filter)
            .pipe(map(page => page.data))

    }

}

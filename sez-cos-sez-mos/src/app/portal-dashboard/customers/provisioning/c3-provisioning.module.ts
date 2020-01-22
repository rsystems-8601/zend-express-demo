/**
 * This module will have all related module,component,services etc related to provisioning.
 * Included Modules are
 * 1. Provisioning List Module 
 * 2. Provisioning Request Create  
 * 3. Provisioning Routing Module 
 * 
 * Included Services are 
 * 1. provisioning service 
 */

import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { C3ProvisioningRoutingModule } from './c3-provisioning-routing.module';
import { C3ProvisioningViewComponent } from './c3-provisioning-view/c3-provisioning-view.component';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { TabedListModule } from 'src/app/common/tabed-list/tabed-list.module';
import { C3ProvisioningService } from './c3-provisioning.service';



@NgModule({
    declarations: [C3ProvisioningViewComponent],
    imports:[
        SharedDatatableModule,
        SharedMatModule,
        SharedLibAndCustomModule,
        TabedListModule,
        RouterModule,
        C3ProvisioningRoutingModule
    ],
    providers:[C3ProvisioningService],
    exports:[C3ProvisioningRoutingModule]
})
export class C3ProvisioningModule{

}
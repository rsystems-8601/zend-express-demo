/**
 * This module will include all routing related to provisioning 
 */

 import { NgModule } from '@angular/core';
 import { Routes, RouterModule } from "@angular/router";
import { C3ProvisioningViewComponent } from './c3-provisioning-view/c3-provisioning-view.component';

const routes: Routes = [
    {
        path:"",
        component: C3ProvisioningViewComponent,
        children:[
            {
                path:"configure",loadChildren: () => import("./c3-provisioning-list/c3-provisioning-list.module").then(m => m.C3ProvisioningListModule)
            },
            {
                path:"provision", loadChildren: () => import("./c3-provisioning-create/c3-provisioning-create.module").then(m => m.C3ProvisioningCreateModule) 
            },
            {
                path:"", redirectTo:"configure"
            }
        ]
    }
   
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class C3ProvisioningRoutingModule{

}

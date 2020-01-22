import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { C3ProvisoningCreateComponent } from './c3-provisoning-create.component';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Step1CustomerInfoComponent } from './step1-customer-info/step1-customer-info.component';
import { Step2NewOrderComponent } from './step2-new-order/step2-new-order.component';
import { Step3ContractInfoComponent } from './step3-contract-info/step3-contract-info.component';
import { Step4DizzionDeliverableFormComponent } from './step4-dizzion-deliverable-form/step4-dizzion-deliverable-form.component';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';


const route:Routes = [
  {
    path:"", component: C3ProvisoningCreateComponent
  }
]

@NgModule({
  declarations: [C3ProvisoningCreateComponent, Step1CustomerInfoComponent, Step2NewOrderComponent, Step3ContractInfoComponent, Step4DizzionDeliverableFormComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    SharedLibAndCustomModule,
    DzControlsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class C3ProvisioningCreateModule { }

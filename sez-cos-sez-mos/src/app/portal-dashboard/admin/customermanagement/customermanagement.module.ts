import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementRoutingModule } from './customermanagement-routing.module';
import { SharedMatModule } from '../../../shared/shared-mat.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Datatable Module
import { SharedDatatableModule } from '../../../shared/shared-datatable.module';

// Custom components for customers
import { StatusdailogComponent } from './components/statusdailog/statusdailog.component';
import { DeletedialogComponent } from './components/delete-customer/deletedialog.component';
import { CosEditCustomerComponent } from './components/cos-edit-customers/cos-edit-customer.component';
import { CosCustomersManagementComponent } from './components/cos-customers-management.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';

@NgModule({
  declarations: [CosCustomersManagementComponent, CosEditCustomerComponent, StatusdailogComponent, DeletedialogComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    DzControlsModule,
    CustomerManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedDatatableModule
  ],
  entryComponents:[CosEditCustomerComponent, StatusdailogComponent, DeletedialogComponent,DeletedialogComponent]
})
export class CustomerManagementModule { }

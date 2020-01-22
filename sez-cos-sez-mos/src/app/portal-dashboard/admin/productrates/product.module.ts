import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './product-routing.module';
import { CosProductManagementComponent } from './components/cos-product-management.component';
import { SharedMatModule } from '../../../shared/shared-mat.module';
import { CosEditProductComponent } from './components/cos-save-edit-product/cos-edit-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedDatatableModule } from '../../../shared/shared-datatable.module';
import { DeletedialogComponent } from './components/delete-product/deletedialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { ProductViewComponent } from './product-view.component';
import { TabedListModule } from '../../../common/tabed-list/tabed-list.module';

@NgModule({
  declarations: [CosProductManagementComponent, CosEditProductComponent, DeletedialogComponent, ProductViewComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    ProductManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedDatatableModule,
    DzControlsModule,
    TabedListModule
  ],
  entryComponents:[DeletedialogComponent]
})
export class ProductmanagementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementRoutingModule } from './category-routing.module';
import { CosCategoryManagementComponent } from './components/cos-category-management.component';
import { SharedMatModule } from '../../../shared/shared-mat.module';
import { CosEditCategoryComponent } from './components/cos-save-edit-category/cos-edit-category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedDatatableModule } from '../../../shared/shared-datatable.module';
import { DeletedialogComponent } from './components/delete-category/deletedialog.component';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { CategoryViewComponent } from './category-view.component';
import { TabedListModule } from '../../../common/tabed-list/tabed-list.module';

@NgModule({
  declarations: [CosCategoryManagementComponent, CosEditCategoryComponent, DeletedialogComponent, CategoryViewComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    DzControlsModule,
    CategoryManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TabedListModule,
    SharedDatatableModule
  ],
  entryComponents:[CosEditCategoryComponent, DeletedialogComponent]
})
export class CategorymanagementModule { }

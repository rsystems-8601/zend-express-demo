
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CosProductManagementComponent } from './components/cos-product-management.component';
import { ProductViewComponent } from './product-view.component';
import { CosEditProductComponent } from './components/cos-save-edit-product/cos-edit-product.component';

const routes: Routes = [
  {
    path: '', component: ProductViewComponent,
    children: [
      {
        path: 'configure', component: CosProductManagementComponent
      },
      {
        path: 'configure/:id', component: CosEditProductComponent
      },
      {
        path: 'provision', component: CosEditProductComponent
      },
      {
        path: '' , redirectTo: 'configure', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CosCategoryManagementComponent } from './components/cos-category-management.component';
import { CategoryViewComponent } from './category-view.component';
import { CosEditCategoryComponent } from './components/cos-save-edit-category/cos-edit-category.component';

const routes: Routes = [
  {
    path:'', component: CategoryViewComponent,
    children:[
      {
        path: 'configure', component: CosCategoryManagementComponent
     },
     {
      path: 'configure/:id', component: CosEditCategoryComponent
     },
     {
       path: 'provision', component: CosEditCategoryComponent
     },
     {
      path:"", redirectTo:"configure"
     }
    ]
  }
];

// CosCategoryManagementComponent, CosEditCategoryComponent, DeletedialogComponent, CategoryViewComponent

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryManagementRoutingModule { }



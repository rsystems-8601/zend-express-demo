import { NgModule } from '@angular/core';
import { PodsCreateComponent } from './pods-create.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';


const routes: Routes = [
  
    {
      path:"",component: PodsCreateComponent
    }
  
]


@NgModule({
  declarations: [
    PodsCreateComponent,
  ],
  imports: [
    CommonModule,
    SharedLibAndCustomModule,
    SharedMatModule,
    SharedDatatableModule,
    RouterModule.forChild(routes)
  ]
})
export class PodsCreateModule { }

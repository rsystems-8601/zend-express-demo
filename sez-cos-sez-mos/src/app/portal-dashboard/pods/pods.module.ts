import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { TestComponentComponent } from './test-component/test-component.component';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';

const routes: Routes = [

]


@NgModule({
  declarations: [

    TestComponentComponent
  ],
  imports: [
    CommonModule,
    SharedLibAndCustomModule,
    SharedMatModule,
    SharedDatatableModule,
    RouterModule.forChild(routes)
  ],
  exports:[
  ]
})
export class PodsModule { }

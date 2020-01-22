import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabedListComponent } from './tabed-list.component';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TabedListComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    RouterModule
  ],
  exports:[
    TabedListComponent
  ]
})
export class TabedListModule { }

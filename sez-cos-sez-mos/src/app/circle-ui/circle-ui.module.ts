import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleGridComponent } from './circle-grid/circle-grid.component';
import { CircleCellComponent } from './circle-cell/circle-cell.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CircleGridComponent, CircleCellComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[CircleGridComponent]
})
export class CircleUiModule { }

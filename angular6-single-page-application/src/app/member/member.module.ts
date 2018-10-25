import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { routing } from './member.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [MemberComponent]
})
export class MemberModule { }

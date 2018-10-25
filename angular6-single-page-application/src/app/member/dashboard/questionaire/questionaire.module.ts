import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { SafeHtmlPipe } from './questionaire.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [],
  providers: [],
  declarations: [SafeHtmlPipe]
})
export class QuestionaireModule { }

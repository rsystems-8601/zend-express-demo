import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectValuesPipe } from 'src/app/infra/object-values.pipe';
import { SafeHtmlPipe } from 'src/app/infra/safe-html.pipe';
import { LinkifyPipe } from 'src/app/infra/linkify.pipe';
import { ObjectKeysPipe } from 'src/app/infra/object-keys.pipe';



@NgModule({
  declarations: [SafeHtmlPipe,ObjectValuesPipe,LinkifyPipe,ObjectKeysPipe],
  imports: [
    CommonModule
  ],
  exports:[SafeHtmlPipe,ObjectValuesPipe,LinkifyPipe,ObjectKeysPipe]
})
export class SharedPipesModule { }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-c3-provisoning-create',
  templateUrl: './c3-provisoning-create.component.html',
  styleUrls: ['./c3-provisoning-create.component.scss']
})
export class C3ProvisoningCreateComponent implements OnInit {
  constructor(public fb: FormBuilder) {

   }

  ngOnInit() {
  }

}

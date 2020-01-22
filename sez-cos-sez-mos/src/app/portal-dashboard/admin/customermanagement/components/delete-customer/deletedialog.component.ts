import { Component, OnInit, Inject } from '@angular/core';

import { Subscription } from 'rxjs';


// Our Sevices and Models

import { MAT_DIALOG_DATA } from '@angular/material';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.less']
})
export class DeletedialogComponent implements OnInit {

  subscription: Subscription;
  customerId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private customerService: CustomerService) {
    // Customer used to delete data
    this.customerId = this.data.custId;
  }

  ngOnInit() {
  }

  deleteSingleCustomer() {
    return this.customerService.getDeleteCustomer(this.customerId).subscribe(data => {
      //console.log(data);
    })
  }



}

import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models

import { MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../../../../datacenter/services/category.service';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {

  subscription: Subscription;
  categoryId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private customerService: CategoryService) {
    // Category Id to delete
    this.categoryId = data.id;
  }

  ngOnInit() {
  }

  deleteSingleCustomer() {
    return this.customerService.getDeleteCategory(this.categoryId, {}).subscribe(data=>{
        this.customerService.categortyChanged.next(true);
    });
  }



}

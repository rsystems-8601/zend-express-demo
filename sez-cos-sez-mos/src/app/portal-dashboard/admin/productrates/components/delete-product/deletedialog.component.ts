import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models
import { ProductService } from "../../product.service";
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {

  subscription: Subscription;
  categoryId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private productService: ProductService) {
    // Category Id to delete
    this.categoryId = data.id;
  }

  ngOnInit() {
  }

  deleteSingleCustomer() {
    return this.productService.getDeleteProduct(this.categoryId).subscribe(data=>{
      console.log(data);
    })
  }



}

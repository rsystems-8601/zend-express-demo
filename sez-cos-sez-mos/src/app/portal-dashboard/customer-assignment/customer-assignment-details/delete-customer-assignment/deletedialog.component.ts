import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models
import { MAT_DIALOG_DATA } from '@angular/material';

import { CustomerAssignmentService } from '../../services/customer-assgnment.service';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.less']
})
export class DeletedialogCustomerassignmentComponent implements OnInit {
  
 
  clusterId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private customerassignmentService: CustomerAssignmentService) { 
    //Category Id to delete
    this.clusterId = data.id;
    // console.log(this.clusterId);
    
  }

  ngOnInit() {
  }

  deleteCustomerassignment() {
    return this.customerassignmentService.getDeleteCustomer(this.clusterId).subscribe(dataCustomer=>{
      if(dataCustomer) {
        this.customerassignmentService.getReloaddata(dataCustomer);
      }
    })
  }



}

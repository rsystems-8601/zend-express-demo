import { Component, OnInit, OnChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';
import { CustomerService } from '../../customer.service';

// Our Sevices and Models


@Component({
  selector: 'app-statusdailog',
  templateUrl: './statusdailog.component.html',
  styleUrls: ['./statusdailog.component.less']
})
export class StatusdailogComponent implements OnInit, OnChanges {

  // Variable for popup
  status: boolean;
  statusTitle: string;
  statusContent: string;
  mydata:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _cutomerService: CustomerService) { 
    if(this.data == null || this.data =='') { 
      this.statusTitle = "Import Customers";
      this.statusContent = "Are you sure you want to import customers from connectwise ?";
    } else {
      this.statusTitle = "Change Customer Status";
      this.statusContent = "Are you sure you want to change status of this Customer?";
    }
  }

  ngOnInit() {
    
  }

  ngOnChanges() {
    //this.passData();
    console.log(this.mydata);
    
  }

  // On click on save API triggers for data status
  changeStatus() {
    // Triggers for import API 
    if(this.data == null || this.data =='') {
      //console.log("Import API will run here...");
      this._cutomerService.getImportCustomer().subscribe((data:any)=> {
        //console.log(data);
      });
    } 
    else
     {
       // Triggers for Change customer Status API 
        if((this.data.status).replace(/(<([^>]+)>)/gi, '') == "Inactive") {
          this.status = true;
        } else {
          this.status = false;
        }
        this._cutomerService.getChangestatus(this.status, this.data.custId).subscribe((data:any)=> {
          this._cutomerService.sendDataToOtherComponent(data);
        });
    }

  }  
  
  passData() {
    //console.log(this.mydata);
    
  }

  

}

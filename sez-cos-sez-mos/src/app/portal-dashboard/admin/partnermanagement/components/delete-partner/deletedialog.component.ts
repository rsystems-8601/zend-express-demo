import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models

import { MAT_DIALOG_DATA } from '@angular/material';
import { PartnerService } from '../../partner.service';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.less']
})
export class DeletedialogComponent implements OnInit {
  
  subscription: Subscription;
  partnerId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _partnerService: PartnerService) { 
    
    // The deleted Partner Id
    this.partnerId = data.partnerId;
  }

  ngOnInit() {
  }

  deleteSinglePartner() {
    return this._partnerService.getDeleteCustomer(this.partnerId).subscribe(data=>{
      //console.log(data);
    })
  }



}

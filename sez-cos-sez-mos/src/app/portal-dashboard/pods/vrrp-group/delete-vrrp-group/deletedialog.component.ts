import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models
import { MAT_DIALOG_DATA } from '@angular/material';
import { VrrpgroupService } from '../vrrp-group.service';


@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogvrrpComponent implements OnInit {
  
  subscription: Subscription;
  clusterId: number;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private vrrpGroupservice: VrrpgroupService) { 
    //Category Id to delete
    this.clusterId = data.id;
  }

  ngOnInit() {
  }

  deleteVrrpgroup() {
    return this.vrrpGroupservice.deleteVrrpgroup(this.clusterId).subscribe(data=>{
      if(data == true) {
        this.vrrpGroupservice.getReloaddata(true);
      }
    })
  }



}

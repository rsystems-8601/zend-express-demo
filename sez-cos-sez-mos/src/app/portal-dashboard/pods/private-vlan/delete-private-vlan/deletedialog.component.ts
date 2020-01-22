import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models
import { MAT_DIALOG_DATA } from '@angular/material';
import { PrivatevlansService } from '../private-vlans.service';


@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogvlanComponent implements OnInit {
  
  subscription: Subscription;
  clusterId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private privatVlanService: PrivatevlansService) { 

    this.clusterId = data.id;
  }

  ngOnInit() {
  }

  deletePrivatevlan() {
    return this.privatVlanService.deletePrivatevlan(this.clusterId).subscribe(data=>{
      if(data == true) {
        this.privatVlanService.getReloaddata(true);
      }
    })
  }



}

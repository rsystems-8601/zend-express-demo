import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models
import { MAT_DIALOG_DATA } from '@angular/material';
import { HardwareclusterService } from '../hardware-cluster.service';



@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {
  
 
  clusterId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private hardwareclusterService: HardwareclusterService) { 
    //Category Id to delete
    this.clusterId = data.id;
  }

  ngOnInit() {
  }

  deleteHardwarecluster() {
    return this.hardwareclusterService.getDeleteHardwarecluster(this.clusterId).subscribe(data=>{
      if(data == true) {
        this.hardwareclusterService.getReloaddata(true);
      }
    })
  }



}

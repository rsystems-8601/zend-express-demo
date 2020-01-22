import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models
import { MAT_DIALOG_DATA } from '@angular/material';
import { VirtualMachinesService } from '../virtual-machines.service';


@Component({
  selector: 'app-deletedialog',
  templateUrl: './vm-deletedialog.component.html',
  styleUrls: ['./vm-deletedialog.component.scss']
})
export class VmDeletedialogComponent implements OnInit {
  
 
  clusterId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private virtualMachineService: VirtualMachinesService) { 
    //Category Id to delete
    this.clusterId = data.id;
  }

  ngOnInit() {
  }

  deleteHardwarecluster() {
    return this.virtualMachineService.getDeleteHardwarecluster(this.clusterId).subscribe(data=>{
      // if(data == true) {
      //   this.virtualMachineService.getReloaddata(true);
      // }
    })
  }



}

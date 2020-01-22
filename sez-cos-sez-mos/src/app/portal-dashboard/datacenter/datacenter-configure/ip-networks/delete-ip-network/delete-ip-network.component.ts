import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models
import { MAT_DIALOG_DATA } from '@angular/material';
import { PrivateIpsService } from '../../../services/private-ips.service';

@Component({
  selector: 'app-delete-ip-network',
  templateUrl: './delete-ip-network.component.html',
  styleUrls: ['./delete-ip-network.component.scss']
})
export class DeleteIpNetworkComponent implements OnInit {

  subscription: Subscription;
  id: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private privateIpsService: PrivateIpsService) { 

      // console.log(data, "Full data for delete");
      
    this.id = data.id;
    // console.log(this.id, "delet IP network");
    
  }

  ngOnInit() {
  }

  deleteIp() {
    return this.privateIpsService.deletePrivateip(this.id).subscribe(data=>{
      if(data) {
        this.privateIpsService.getReloaddata(data);
      }
    })
  }

}

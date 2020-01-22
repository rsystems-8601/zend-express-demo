import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

// Our Sevices and Models
import { PrivateIpsService } from '../../../../services/private-ips.service';

@Component({
  selector: 'app-deallocate-ip-network',
  templateUrl: './deallocate-ip-network.component.html',
  styleUrls: ['./deallocate-ip-network.component.scss']
})
export class DeallocateIpNetworkComponent implements OnInit {

  id: number;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private privateIpsService: PrivateIpsService) {
      this.id = data;
  }

  ngOnInit() {

  }

  deallocateIp() {
    return this.privateIpsService.deallocatePrivateip(this.id, {}).subscribe(data=>{
      console.log('Deallocate Ip ', data);
      if(data) {
        this.privateIpsService.sendDeAlocatedIpdata(data);
      }
    })
  }

  // ngOnDestroy() {
  //   this.privateIpsService.reloadAlocateIp.unsubscribe();
  //   this.privateIpsService.reloadDeAlocateIp.unsubscribe();
  // }

}

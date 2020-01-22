import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
  
// Our Sevices and Models
import { PrivateIpsService } from '../../../../services/private-ips.service';

@Component({
  selector: 'app-allocate-ip-network',
  templateUrl: './allocate-ip-network.component.html',
  styleUrls: ['./allocate-ip-network.component.scss']
})
export class AllocateIpNetworkComponent implements OnInit {

  allocateIpForm: FormGroup;
  searchCustomer : FormControl = new FormControl();
  customerList = <any>[];
  networkId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogRef: MatDialogRef<AllocatePrivateIpComponent>,
    public formBuilder: FormBuilder,
    private privateIpsService: PrivateIpsService) {

    this.allocateIpForm = this.formBuilder.group({
      custId: '',
      custName: '',
      custCID: '',
      purpose: ''
    });

    this.networkId = data;
  }

  ngOnInit() {
    this.searchCustomer.valueChanges.subscribe(
      name => {
        if (name != '') {
          const reqPayload = {"customerName":name};
          this.privateIpsService.searchCustomer(reqPayload).subscribe(
            data => {
              this.customerList = data.data as any[];
          })
        }
    })
  }

  selectCustomer(event: any) {
    if(event.isUserInput) {
      const selectedCustomer = this.customerList.find((item) => { return item["custId"] == event.source.value });
      this.allocateIpForm.get("custCID").patchValue(selectedCustomer["custCID"]);
      this.allocateIpForm.get("custId").patchValue(selectedCustomer["custId"]);
      this.allocateIpForm.get("custName").patchValue(selectedCustomer["custName"]);
    }
  }  

  allocateIp() {
    let form = this.allocateIpForm.value;
    let reqPayload = {
      "id": this.networkId,
      "customerId": form.custId,
      "purpose": form.purpose
    };

    return this.privateIpsService.allocatePrivateip(reqPayload).subscribe(data=>{
      // console.log('Allocate Ip ', data);
      if(data) {
        this.privateIpsService.sendAlocatedIpdata(data);
      }
    })
  }


  // ngOnDestroy() {
  //   this.privateIpsService.reloadAlocateIp.unsubscribe();
  //   this.privateIpsService.reloadDeAlocateIp.unsubscribe();
  // }

}

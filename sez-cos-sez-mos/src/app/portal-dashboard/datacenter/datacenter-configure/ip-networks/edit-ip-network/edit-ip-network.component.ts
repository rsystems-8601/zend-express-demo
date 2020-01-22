import { Component, Inject, OnInit, OnChanges } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

// For customer custom files 
import { AllocateIpNetworkComponent } from "./allocate-ip-network/allocate-ip-network.component"
import { DeallocateIpNetworkComponent } from "./deallocate-ip-network/deallocate-ip-network.component"
import { NetworkIps } from "../../../models/private-ips.model";
import { PrivateIpsService } from '../../../services/private-ips.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableSharedService } from 'src/app/shared/data-table/data-table.service';
import { ToastyService } from 'ngx-toasty';
// import { ToastyService } from 'ngx-toasty';



@Component({
  selector: 'app-edit-ip-network',
  templateUrl: './edit-ip-network.component.html',
  styleUrls: ['./edit-ip-network.component.scss']
})
export class EditIpNetworkComponent implements OnInit {

  privateipForm: FormGroup;
  ipAddressList: [];
  publicVlanList: string[];
  Title: string;

  networkId: number;
  isPublicIp: boolean = false;
  enviromentType:string;
  dataCenterId: number;
  envType: string;
  isReadOnly: boolean = false;
  aa: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public networkModel: NetworkIps,
    public dialogRef: MatDialogRef<EditIpNetworkComponent>,
    private dialog: MatDialog,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
    private dataTableService: DataTableSharedService,
    public privateIpsService: PrivateIpsService,
    private toastyService: ToastyService
  ) {

    this.envType = this.route.snapshot.queryParamMap.get('envType');
    
    

    if(this.envType) {
      this.Title = "View IP Network";
      this.isReadOnly = true;
      this.isPublicIp = false;
    } else {
      this.Title = "Edit IP Network";
      this.isReadOnly = false;
    }






    this.dataCenterId = +(this.route.parent.parent.parent.snapshot.params.id);

    const ipPatternForVlan = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

    // Form Data
    this.privateipForm = this.formBuilder.group({
      networkIp: [networkModel && networkModel.networkIp],
      cidrNumber: [networkModel && networkModel.cidrNumber],
      gateway: [networkModel && networkModel.gateway, [Validators.required, Validators.pattern(ipPatternForVlan)]],
      subnetMask: [networkModel && networkModel.subnetMask, [Validators.required, Validators.pattern(ipPatternForVlan)]],
      vlanId: [networkModel && networkModel.vlanView && (+networkModel.vlanView.id)]
    });


    this.networkId = networkModel.id;
   
    this.route.params
      .subscribe(param => {
        if (this.networkModel.id === undefined) {
          this.networkId = param.id;

        }
      });
  }

  ngAfterViewInit()  {
    this.aa = <any>this.route.snapshot.queryParamMap.get('type');
    setTimeout(()=> {
        if(this.aa==='false') {
          this.isPublicIp = false;
          document.getElementById('vlantype').style.display = 'none';
        } else {
          this.isPublicIp = true;
          document.getElementById('vlantype').style.display = 'block';
        }
    }, 0)
    
  }

  get gateway() { return this.privateipForm.get('gateway') };
  get subnetMask() { return this.privateipForm.get('subnetMask') };

  ngOnInit() {
    
    document.getElementById('vlantype').style.display = 'none';
    this.route.params
      .subscribe(param => {

        if (param.id) {
          this.privateIpsService.getprivateIpDetails(param.id).subscribe(data => {

            this.enviromentType = data.environment;
            if (this.enviromentType === "Compliance") {
              this.enviromentType = "Compliant";
            }
            this.isPublicIp = data.type;
            if (this.isPublicIp) {
              // Get vlan list
              const reqPayload = {
                dataCenterId: this.dataCenterId,
                environmentType: this.enviromentType
              };
              this.privateIpsService.getPublicVlanList(reqPayload)
                .subscribe((data: any) => {
                  this.publicVlanList = data;
                  // console.log(this.publicVlanList, "All vlan Id");

                });
            }
            this.privateipForm.patchValue(data);

            this.privateipForm.get('vlanId').setValue(data.vlanView.id);
          });
        }

        if (this.networkModel.id === undefined) {
          this.networkId = param.id;
        }

      });

    // Get network list

    this.getPrivateIpnetworkDetails(this.networkId, this.isPublicIp);

    this.privateIpsService.reloadDeAlocateIp.subscribe(dealocatedStatus => {
      if (dealocatedStatus) {
        this.getPrivateIpnetworkDetails(this.networkId, this.isPublicIp);
      }
    })

    this.privateIpsService.reloadAlocateIp.subscribe(alocatedStatus => {
      if (alocatedStatus) {
        this.getPrivateIpnetworkDetails(this.networkId, this.isPublicIp);
      }
    })

  }

  getPrivateIpnetworkDetails(networkId, publicIp) {
    this.privateIpsService.getprivateIpNetworkDetails(networkId, publicIp)
      .subscribe((data) => {
        this.ipAddressList = data;
        // console.log(this.ipAddressList, "IP Address");
        
      });


  }

  ngOnChanges() {

  }

  // Update form
  updatePrivateIp() {
    const form = this.privateipForm.value;
    const createUpdateRequest = {
      id: this.networkId,
      networkIp: form.networkIp,
      cidrNumber: form.cidrNumber,
      gateway: form.gateway,
      subnetMask: form.subnetMask,
      vlanId: form.vlanId
    };
    this.privateIpsService.updatePrivateip(createUpdateRequest).subscribe(data => {
      this.toastyService.success('Record updated successfully!');
      // this.router.navigate(['../'], { relativeTo: this.route.parent } );  
      // this.router.navigate(['../'], {  queryParams: { type: this.isPublicIp }, relativeTo: this.route } )
      if (!data) {
        this.toastyService.error('Process failed, please try again');
      }
    });

    // this.closePopup()
  }

  // closePopup() {
  //   this.dialogRef.close();
  // }

  reservePrivateIp(id: number) {
    this.privateIpsService.reservePrivateip(id, {}).subscribe(data => {
      if (data) {
        this.getPrivateIpnetworkDetails(this.networkId, this.isPublicIp);
        // this.toastyService.success("Private IP Reserved Successfully");
      }
    });
  }

  unreservePrivateIp(id: number) {
    this.privateIpsService.unreservePrivateip(id, {}).subscribe(data => {
      if (data) {
        this.getPrivateIpnetworkDetails(this.networkId, this.isPublicIp);
      }
    });
  }

  openallocateIpDialog(id: number): void {
    const dialogRef = this.dialog.open(AllocateIpNetworkComponent, {
      width: '800px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  opendeallocateIpDialog(id: number): void {
    const dialogRef = this.dialog.open(DeallocateIpNetworkComponent, {
      width: '800px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // ngOnDestroy() {
  //   this.privateIpsService.reloadAlocateIp.unsubscribe();
  //   this.privateIpsService.reloadDeAlocateIp.unsubscribe();
  // }

}

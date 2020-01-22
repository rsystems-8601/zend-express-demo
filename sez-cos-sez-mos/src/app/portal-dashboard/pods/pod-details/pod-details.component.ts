import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Datacenter, Pods } from 'src/app/models/cos-common.model';
import { Poddetails } from 'src/app/models/poddetails.model';
import { PodServicesService } from '../pod-services.service';


@Component({
  selector: 'app-pod-details',
  templateUrl: './pod-details.component.html',
  styleUrls: ['./pod-details.component.scss']
})
export class PodDetailsComponent implements OnInit {

  // authSubordinateRoles: Role[];
  pageTitle: string = "POD DETAILS:";
  // podcreateForm: FormGroup; 
  dataCenters: Datacenter[];
  podsData: Pods[];
  datacentereachId: number;
  podId: number;

  networkData: string;
  serverData: string;
  datacenterName: any;
  datacetneridValue: any;
  poddetails: Poddetails;
  details: any;
  configuration: any;
  Components: any;
  // indexOrderDesc:boolean=true;
  constructor(
    private podsService: PodServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.datacentereachId = this.route.parent.parent.parent.parent.snapshot.params.id;
    this.podId = this.route.parent.parent.parent.parent.snapshot.params.podId;
    this.podsService.getDatacenterdetails(this.datacentereachId).subscribe(datacentervalue => {
      this.datacenterName = datacentervalue.name;
    })
  }

  ngOnInit() {
    /* 
      Load Full Pod detailed Value on the basis of Perticular POD ID
    */

    this.podsfullDetails();
  }


  /* 
    Method To load POD details on the basis of pod Id
 */

  podsfullDetails() {

    this.podsService.getPodDetails(this.podId).subscribe((data) => {

      this.poddetails = <Poddetails>data;
      // Server Type
      const serversArr = [];
      const servers = this.poddetails.servers;
      if (servers) {
        servers.forEach(element_server => {
          serversArr.push(element_server.name);
        });
        this.serverData = serversArr.join(", ");
      }


      // NetWork Type
      const networktypeArr = [];
      const networktype = this.poddetails.networkType;
      if (networktype) {
        networktype.forEach(elementnetwork => {
          networktypeArr.push(elementnetwork);
        });
        this.networkData = networktypeArr.join(", ");
      }


      this.details = {
        'Pod Name': this.poddetails.podName,
        "Pod Notation Id": this.poddetails.podNotationId,
        'Domain': this.poddetails.domain,
      }

      this.configuration = {
        'Environment Type': this.poddetails.environmentType,
        "Pod Notation Id": this.poddetails.podNotationId,
        Servers: (this.serverData) ? this.serverData : "",
        "Network Type": (this.networkData) ? this.networkData : "",
      }

      this.Components = {
        Vcenter: this.poddetails.vCenter.name,
        Version: this.poddetails.vCenter.version,
        URL: this.poddetails.vCenter.url,
        'State Name': this.poddetails.vCenter.privateIP
      }

    });

  }

  redirectToupdatePod() {
    let url = this.router.url;
    url = url.replace('pod-details', 'pod-update');
    this.router.navigate([url], { queryParams: { title: 'podUpdate' } });
  }

  // ngAfterViewInit() {
  //   // this.loaderService.hide();
  //   // var vv = this;
  //   // setTimeout(function(){vv.loaderService.hide();}, 5000)

  // }




}

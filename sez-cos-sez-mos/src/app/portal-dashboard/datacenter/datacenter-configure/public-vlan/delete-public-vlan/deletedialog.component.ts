import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

// Our Sevices and Models
import { MAT_DIALOG_DATA } from '@angular/material';
import { PublicvlansService } from '../../../services/public-vlans.service';
import { ToastyService } from 'ngx-toasty';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogpublicvlanComponent implements OnInit {

  subscription: Subscription;
  clusterId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private publicVlanService: PublicvlansService,
    private toastyService: ToastyService
  ) {

    this.clusterId = data.id;

  }

  ngOnInit() {
  }

  deletePublicvlan() {
    return this.publicVlanService.deletePublicVlan(this.clusterId).subscribe(data => {
      if (data) {
        this.toastyService.success('Record deleted successfully!');
        this.publicVlanService.getReloaddata(data);
      }
      if (!data) {
        this.toastyService.error('Process failed, please try again');
      }
    });
  }

}

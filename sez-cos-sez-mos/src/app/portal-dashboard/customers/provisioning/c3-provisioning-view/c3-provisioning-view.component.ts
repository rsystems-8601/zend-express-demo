import { Component, OnInit } from '@angular/core';
import { TabListItem } from 'src/app/models/tab-lists-dto';

@Component({
  selector: 'app-c3-provisioning-view',
  templateUrl: './c3-provisioning-view.component.html',
  styleUrls: ['./c3-provisioning-view.component.scss']
})
export class C3ProvisioningViewComponent implements OnInit {
  configPath: TabListItem[] = [];
  constructor() { }

  ngOnInit() {

    this.configPath = [
    {
      labelName: 'Configure',
      path: './configure',
      isActive: 'active'
    },
    {
      labelName: 'Provision',
      path: './provision',
      isActive: ''
    }];
  }

}

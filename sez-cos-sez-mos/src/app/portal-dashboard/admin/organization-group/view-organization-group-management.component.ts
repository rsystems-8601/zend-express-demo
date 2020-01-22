import { Component, OnInit } from '@angular/core';
import { TabListItem } from 'src/app/models/tab-lists-dto';

@Component({
  selector: 'app-view-organization-group-management',
  templateUrl: './view-organization-group-management.component.html',
  styleUrls: ['./view-organization-group-management.component.scss']
})

export class ViewOrganizationGroupManagementComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { TabListItem } from 'src/app/models/tab-lists-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss']
})
export class OrganizationViewComponent implements OnInit {

  configPath:TabListItem[] = [];
  constructor(private route: ActivatedRoute) {

   }

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
import { Component, OnInit } from '@angular/core';
import { TabListItem } from 'src/app/models/tab-lists-dto';

@Component({
  selector: 'app-application-group-view',
  templateUrl: './application-group-view.component.html',
  styleUrls: ['./application-group-view.component.scss']
})

export class ApplicationGroupViewComponent implements OnInit {
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

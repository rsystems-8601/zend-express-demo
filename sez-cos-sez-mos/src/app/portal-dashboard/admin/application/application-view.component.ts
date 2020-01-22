import { Component, OnInit } from '@angular/core';
import { TabListItem } from 'src/app/models/tab-lists-dto';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.scss']
})

export class ApplicationViewComponent implements OnInit {
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

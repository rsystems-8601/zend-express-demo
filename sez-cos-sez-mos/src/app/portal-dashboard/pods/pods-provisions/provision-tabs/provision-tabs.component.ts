import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provision-tabs',
  templateUrl: './provision-tabs.component.html',
  styleUrls: ['./provision-tabs.component.scss']
})
export class ProvisionTabsComponent implements OnInit {
  imagePath: string = "assets/images/datacenter-configure";
  constructor() { }

  ngOnInit() {
  }

}

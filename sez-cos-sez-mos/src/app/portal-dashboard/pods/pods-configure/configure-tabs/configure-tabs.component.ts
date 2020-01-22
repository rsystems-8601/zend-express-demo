import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configure-tabs',
  templateUrl: './configure-tabs.component.html',
  styleUrls: ['./configure-tabs.component.scss']
})
export class ConfigureTabsComponent implements OnInit {
  imagePath: string = "assets/images/datacenter-configure";
  activeClass:string="";
  constructor() { }

  ngOnInit() {
  }

}

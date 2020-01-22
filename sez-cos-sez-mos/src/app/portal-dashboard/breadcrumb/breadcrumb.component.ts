import { Component, OnInit } from '@angular/core';
import { ToggleNavbarService } from '../../services/toggle-navbar.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private toogleServie: ToggleNavbarService) { }

  private clikcedMenu = false;

  ngOnInit() {
  }


  onClickMenu() {
    this.clikcedMenu = !this.clikcedMenu;
    this.toogleServie.toggleMenuCliked(this.clikcedMenu);
  }

}

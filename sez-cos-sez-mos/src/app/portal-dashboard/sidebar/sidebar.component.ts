
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToggleNavbarService } from '../../services/toggle-navbar.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public selectedListItem: string = '';
  public toogleMenu  = false;
  private toogleSubscription: Subscription;
  constructor(private toogleServie: ToggleNavbarService, private route: ActivatedRoute, private router: Router) { }
  @SessionStorage("sideBarSelectedMenu") private sideBarSelectedMenu: string;
  ngOnInit() {
   this.toogleSubscription =  this.toogleServie.menuClicked.subscribe( status => {
      this.toogleMenu = status;  
      console.log(status);
    });
    this.selectedListItem =  this.sideBarSelectedMenu ? this.sideBarSelectedMenu : null;
  }

  setActive(selectedItem: string){
    this.selectedListItem = this.selectedListItem == selectedItem ? null : selectedItem;
    this.sideBarSelectedMenu = this.selectedListItem;
  }

  redirectCreatedatacenter() {
    this.router.navigate(['configure/datacenter-details'],{relativeTo: this.route, queryParams: { title:'dataCenterAdd'} } );
  }

  ngOnDestroy() {
    this.toogleSubscription.unsubscribe();

  }
}

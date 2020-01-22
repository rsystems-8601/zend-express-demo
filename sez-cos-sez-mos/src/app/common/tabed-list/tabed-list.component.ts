import { Component, OnInit, Input } from '@angular/core';
import { TabListItem } from '../../models/tab-lists-dto';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  vat: string;
  name: string;
  created: string;
  status: string;
  status_class: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {vat: '53275531', name: 'Jacob', created: '12 May 2017', status: 'Pending', status_class: 'Pending'},
  {vat: '53275532', name: 'Messsy', created: '12 May 2017', status: 'In progress', status_class: 'progress'},
  {vat: '53275533', name: 'John', created: '12 May 2017', status: 'Fixed', status_class: 'fixed'},
  {vat: '53275534', name: 'Peter', created: '12 May 2017', status: 'Completed', status_class: 'completed'},
  {vat: '53275535', name: 'Dave', created: '12 May 2017', status: 'In progress', status_class: 'progress'},
];

@Component({
  selector: 'app-tabed-list',
  templateUrl: './tabed-list.component.html',
  styleUrls: ['./tabed-list.component.scss']
})
export class TabedListComponent implements OnInit {

  @Input("config-tabs") navLinks: TabListItem[];
  public activeLink : string = "";
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
     console.log(this.router.routerState.snapshot.url);
     let urlSplits = this.router.routerState.snapshot.url;

    //  this.activeLink = this.router.routerState.snapshot.url;
   }

  ngOnInit() {
    console.log("*****",  this.navLinks);
    let urlSplits = this.router.routerState.snapshot.url;
    this.navLinks.map(nav =>{
      if(nav.isActive){
        this.activeLink = nav.path;
      }

    })
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

}

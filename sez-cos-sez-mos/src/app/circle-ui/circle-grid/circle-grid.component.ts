import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-circle-grid',
  templateUrl: './circle-grid.component.html',
  styleUrls: ['./circle-grid.component.scss']
})
export class CircleGridComponent implements OnInit {
  @Input('circleGrid') circleGrid;
  @Input('parentList') parentList = [{}];
  @Output('gridClicked') gridCliked = new EventEmitter();
  public innerParent = []
  public cell: any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  
  ngOnInit() {
    this.cell = this.circleGrid;
    this.innerParent = this.parentList.slice(this.parentList.length -3);
  }

  clickListItm(event: Event,index,item,parent){
    (<Event>event).stopPropagation();
    console.log('sdasda')
    if(index){
      return false;
    }
    this.gridCliked.emit({
      ...this.cell,
      listItems:item,
    });
  }

  clickOnParent(event: Event, parent){
    (<Event>event).stopPropagation();
    console.log(parent);
    this.gridCliked.emit({
      parent
    });
  }
  redirectTodetailPage(event: Event,circleDetail){
    event.stopPropagation();  
    console.log(circleDetail);
    console.log(this.parentList);
    switch (circleDetail.listLevelType){
      case "DataCenters":
        this.router.navigate([circleDetail.listLevelID,'configure','datacenter-details'],{relativeTo: this.route});
        break;
      case "Pods":
        let datacenterId = this.parentList[1]['listLevelID'];
        // this.router.navigate([datacenterId,circleDetail.listLevelID,'configure', 'pod-details'],{relativeTo: this.route});
      
    }
    
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { DashboardService } from "./dashboard.service";
import { PsnCookieService } from '../../shared/services/psnCookieService';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService, private router: Router, private cookieService: PsnCookieService) {}
  ngOnInit() {
    // this.getFirstQuestionaire();

    // this.router.navigate(["/member/dashboard/questionaire/12"]);
    this.router.navigate(["/member/dashboard/questionaire/1"]);
  }

/// not in use.
  getFirstQuestionaire() {
    //this.dashboardService.getMyQuestions(12,0,"").subscribe(resp => {
      this.dashboardService.getMyQuestions(1,0,"").subscribe(resp => {
      if (resp && resp["questions"]) {
        this.goto(resp.userid);
      }
    });
  }
/// not in use.
  goto(userId) {
    // this.router.navigate(['../my-app', appId], { relativeTo: this.route });
    this.router.navigate(["/member/dashboard/questionaire/" + userId + "/19"])   /// not in use.
  }
}

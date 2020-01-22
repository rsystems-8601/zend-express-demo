import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MatDialog } from '@angular/material';
import { EditsettingdialogComponent } from './edit-setting/editsettingdialog.component';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dialogRef: any;

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['ROLE_ADMIN', 'ROLE_USER'];


  lineChartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontColor: "white",
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "white",
        },
        gridLines: {
          color: '#FFFFFF'
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: "white",
        },
        gridLines: {
          color: '#FFFFFF'
        }
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: '#a4a5ab',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';



  constructor(
    private dialog: MatDialog,
    private userService: UserProfileService
  ) {

    this.userService.getUserDetails();
  }

  ngOnInit() {
  }

  openEditSetting() {
    const dialogRef = this.dialog.open(EditsettingdialogComponent, {
      width: '550px',
      height: 'auto',
      data: { user: 1, email: 'cosmos' }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.deleteEvent.emit(result);
    // });

  }


}

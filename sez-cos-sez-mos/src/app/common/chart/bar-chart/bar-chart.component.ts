import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];


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

  constructor() { }

  ngOnInit() {
  }

}

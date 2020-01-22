import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {
  bubbleChartColors = "green";
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      labels: {
          fontColor: "white",
      }
  },
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 50,
          fontColor: "white"
        },
        gridLines: {
          color: '#FFFFFF'
        },
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 50,
          fontColor: "white"
        },
        gridLines: {
          color: '#FFFFFF'
        }
      }]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 15, y: 15, r: 15 },
        { x: 25, y: 15, r: 25 },
        { x: 36, y: 12, r: 33 },
        { x: 10, y: 18, r: 18 },
      ],
      label: 'Investment Equities',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}

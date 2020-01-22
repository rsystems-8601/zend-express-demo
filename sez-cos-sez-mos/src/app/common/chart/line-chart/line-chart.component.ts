import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {



  public barChartOptions: any = {
    scaleShowVerticalLines: false,
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
          // fontSize: 18,
          stepSize: 1,
          beginAtZero: true
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

    public mbarChartLabels: string [] = ['2012', '2013', '2014', '2015', '2016', '2017', '2018'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;


    public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(247,98,127,0.2)',
      borderColor: 'rgba(247,98,127,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    },
    {
      backgroundColor: 'rgba(77,20,96,0.3)',
      borderColor: 'rgba(77,20,96,1)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    }
  ];
    public barChartData: any[] = [
      {data: [55, 60, 75, 82, 56, 62, 80], label: 'Company A'},
      {data: [58, 55, 60, 79, 66, 57, 90], label: 'Company B'}
    ];

    // events
    public chartClicked(e: any): void {
      console.log(e);
    }

    public chartHovered(e: any): void {
      console.log(e);
    }

    public randomize(): void {
      let data = [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        (Math.random() * 100),
        Math.round(Math.random() * 100),
        (Math.random() * 100),
        Math.round(Math.random() * 100)];
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
    }






  constructor() { }

  ngOnInit() {
  }

}

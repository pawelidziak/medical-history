import {Component, NgModule, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {TestService} from '../../_services/test.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [TestService],
})
export class GraphComponent implements OnInit {

  chart = []; // This will hold our chart info

  constructor(private _test: TestService) {}

  ngOnInit() {
    this._test.dailyForecast()
      .subscribe(res => {
        console.log(res)
        const temp_max = res['list'].map(res1 => res1.main.temp_max);
        const temp_min = res['list'].map(res1 => res1.main.temp_min);
        const alldates = res['list'].map(res1 => res1.dt);

        const weatherDates = [];
        alldates.forEach((res1) => {
          const jsdate = new Date(res1 * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
        });
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      });
  }
}

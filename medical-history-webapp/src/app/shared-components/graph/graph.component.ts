import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {TestService} from '../../_services/test.service';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [TestService],
})
export class GraphComponent implements OnInit {

  name: string;
  labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  data: number[] = [350, 450, 100];
  type = 'doughnut';

  colorsUndefined: Array<Color>;
  colorsEmpty: Array<Color> = [];

  datasets: any[] = [
    {
      data: this.data,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#000',
        '#36A2EB',
        '#FFCE56'
      ]
    }];

  constructor() {
    this.name = 'Angular2';
  }

  ngOnInit() {
  }

}

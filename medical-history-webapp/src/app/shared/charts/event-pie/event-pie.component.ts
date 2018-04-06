import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EventModel} from '../../../core/models/EventModel';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-event-pie',
  templateUrl: './event-pie.component.html',
  styleUrls: ['./event-pie.component.scss']
})
export class EventPieComponent implements OnInit, OnChanges {

  @Input('eventsList') eventsList: EventModel[] = [];
  @ViewChild(BaseChartDirective) private _chart;

  public eventsCount: Array<any> = [
    {name: 'VISIT', count: 0},
    {name: 'INFO', count: 0},
    {name: 'DISEASE', count: 0}
  ];
  public pieChartLabels: string[] = ['Visit', 'Info', 'Disease'];
  public pieChartData: number[] = [0, 0, 0];
  public pieChartType = 'pie';
  public options: any = {
    legend: {position: 'bottom'},
    responsive: true
  };
  public pieChartColor: Array<any> = [{backgroundColor: ['#8BC34A', '#1976D2', '#D50000']}];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this._chart.refresh();
      this.updateChart();
    }, 200);

  }

  public updateChart() {
    this.eventsCount.forEach(x => x.count = 0);
    this.eventsList.forEach(myEvent => {
      switch (myEvent.type.name) {
        case 'VISIT':
          this.eventsCount[0].count++;
          break;
        case 'INFO':
          this.eventsCount[1].count++;
          break;
        case 'DISEASE':
          this.eventsCount[2].count++;
          break;
      }
    });
    this.pieChartData = [this.eventsCount[0].count, this.eventsCount[1].count, this.eventsCount[2].count];
  }

}

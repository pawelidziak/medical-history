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
    {name: 'DISEASE', count: 0},
    {name: 'INFO', count: 0},
    {name: 'VISIT', count: 0}
  ];
  public pieChartLabels: string[] = ['Disease', 'Info', 'Visit'];
  public pieChartData: number[] = [0, 0, 0];
  public pieChartType = 'pie';
  public options: any = {legend: {position: 'bottom'}};
  public pieChartColor: Array<any> = [{backgroundColor: ['#D50000', '#1976D2', '#8BC34A']}];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this._chart.refresh();
    }, 1);
    this.updateChart();
  }

  public updateChart() {
    this.eventsCount.forEach(x => x.count = 0);
    this.eventsList.forEach(myEvent => {
      switch (myEvent.type.name) {
        case 'DISEASE':
          this.eventsCount[0].count++;
          break;
        case 'INFO':
          this.eventsCount[1].count++;
          break;
        case 'VISIT':
          this.eventsCount[2].count++;
          break;
      }
    });
    this.pieChartData = [this.eventsCount[0].count, this.eventsCount[1].count, this.eventsCount[2].count];
  }

}

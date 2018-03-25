import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EventModel} from '../../../core/models/EventModel';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-events-bar-line',
  templateUrl: './events-bar-line.component.html',
  styleUrls: ['./events-bar-line.component.scss']
})
export class EventsBarLineComponent implements OnInit, OnChanges {

  @Input('eventsList') eventsList: EventModel[] = [];
  @Input('chartType') chartType: string;
  @ViewChild(BaseChartDirective) private _chart;

  public chartLabels: string[] = [];
  public chartData: any[] = [
    {data: [], label: 'Visit'},
    {data: [], label: 'Info'},
    {data: [], label: 'Disease'}
  ];

  private MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  public chartColors = [
    {backgroundColor: '#8BC34A', borderColor: '#8BC34A'},
    {backgroundColor: '#1976D2', borderColor: '#1976D2'},
    {backgroundColor: '#D50000', borderColor: '#D50000'}
  ];

  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {position: 'bottom'},
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1
        }
      }]
    },
    title: {
      display: true,
      text: 'Events statistics',
      fontSize: 20
    }
  };

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

  private updateChart() {

    this.eventsList.forEach(x => {

      const monthNo = x.date.getMonth();

      // get all months as labels
      const monthName = this.MONTH_NAMES[monthNo];
      if (this.chartLabels.findIndex(y => y === monthName) === -1) {
        this.chartLabels.push(monthName);
      }

      this.chartData.forEach(z => z.data.push(0));
    });

    this.chartLabels.forEach((monthName, index) => {

      const monthNo = this.MONTH_NAMES.findIndex(x => x === monthName);

      this.eventsList.forEach(myEvent => {

        if (myEvent.date.getMonth() === monthNo && myEvent.type.name === 'VISIT') {
          this.chartData[0].data[index]++;
        }
        if (myEvent.date.getMonth() === monthNo && myEvent.type.name === 'INFO') {
          this.chartData[1].data[index]++;
        }
        if (myEvent.date.getMonth() === monthNo && myEvent.type.name === 'DISEASE') {
          this.chartData[2].data[index]++;
        }
      });
    });

  }

}

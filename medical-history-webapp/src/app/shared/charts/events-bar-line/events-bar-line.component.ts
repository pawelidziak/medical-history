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
  @Input('title') title: string;
  @Input('legendPos') legendPos: string;
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

  public chartColors = [];

  public chartOptions: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this._chart.refresh();
      this.setColors();
      this.setOptions();
      this.updateChart();
    }, 200);
  }

  private updateChart() {

    const tmpList = [];
    this.eventsList.forEach(temp => tmpList.push(temp));
    tmpList.sort((a: EventModel, b: EventModel) => a.date < b.date ? -1 : 1);

    this.chartData.forEach(d => d.data = []);
    tmpList.forEach(x => {

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

      tmpList.forEach(myEvent => {

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

  private setColors() {
    if (this.chartType === 'bar') {
      this.chartColors = [
        {backgroundColor: '#8BC34A', borderColor: '#8BC34A'},
        {backgroundColor: '#1976D2', borderColor: '#1976D2'},
        {backgroundColor: '#D50000', borderColor: '#D50000'}
      ];
    } else if (this.chartType === 'line') {
      this.chartColors = [
        {
          borderColor: '#8BC34A',
          backgroundColor: 'rgba(139, 195, 74,0.5)'
        },
        {
          borderColor: '#1976D2',
          backgroundColor: 'rgba(25, 118, 210,0.5)'
        },
        {
          borderColor: '#D50000',
          backgroundColor: 'rgba(213, 0, 0, 0.5)'
        }
      ];
    }
  }

  private setOptions() {
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      legend: {position: this.legendPos},
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 1
          }
        }]
      },
      title: {
        display: this.title,
        text: 'Events statistics',
        fontSize: 20
      }
    };
  }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventModel} from '../../../core/models/EventModel';

@Component({
  selector: 'app-events-bar-line',
  templateUrl: './events-bar-line.component.html',
  styleUrls: ['./events-bar-line.component.scss']
})
export class EventsBarLineComponent implements OnInit, OnChanges {

  @Input('eventsList') eventsList: EventModel[] = [];

  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public showChart = false;

  public barChartData: any[] = [
    {data: [], label: 'Visit'},
    {data: [], label: 'Info'},
    {data: [], label: 'Disease'}
  ];

  private MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  public barChartColors = [
    {backgroundColor: '#8BC34A', borderColor: '#8BC34A'},
    {backgroundColor: '#1976D2', borderColor: '#1976D2'},
    {backgroundColor: '#D50000', borderColor: '#D50000'}
  ];

  public barChartOptions: any = {
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
    this.setMonthLabels();
  }

  private setMonthLabels() {

    this.eventsList.forEach(x => {

      const monthNo = x.date.getMonth();

      // get all months as labels
      const monthName = this.MONTH_NAMES[monthNo];
      if (this.barChartLabels.findIndex(y => y === monthName) === -1) {
        this.barChartLabels.push(monthName);
      }

      this.barChartData.forEach(z => z.data.push(0));
    });

    this.barChartLabels.forEach((monthName, index) => {

      const monthNo = this.MONTH_NAMES.findIndex(x => x === monthName);

      this.eventsList.forEach(myEvent => {

        if (myEvent.date.getMonth() === monthNo && myEvent.type.name === 'VISIT') {
          this.barChartData[0].data[index]++;
        }
        if (myEvent.date.getMonth() === monthNo && myEvent.type.name === 'INFO') {
          this.barChartData[1].data[index]++;
        }
        if (myEvent.date.getMonth() === monthNo && myEvent.type.name === 'DISEASE') {
          this.barChartData[2].data[index]++;
        }
      });
    });

    this.showChart = true;
  }

}

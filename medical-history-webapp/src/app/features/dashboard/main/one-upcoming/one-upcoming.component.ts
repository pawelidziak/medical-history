import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from '../../../../core/models/EventModel';

@Component({
  selector: 'app-one-upcoming',
  templateUrl: './one-upcoming.component.html',
  styleUrls: ['./one-upcoming.component.scss']
})
export class OneUpcomingComponent implements OnInit {

  @Input('upcoming') upcoming: EventModel;

  constructor() {
  }

  ngOnInit() {
  }

}

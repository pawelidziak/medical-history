import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from '../../../_models/EventModel';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input('event') event: EventModel;

  constructor() {
  }

  ngOnInit() {
  }
}

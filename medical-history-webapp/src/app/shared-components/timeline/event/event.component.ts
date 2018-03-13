import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from '../../../_models/EventModel';
import {EventService} from '../../../_services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input('eventID') eventID: string;
  event: EventModel;

  constructor(private _eventService: EventService) {
  }

  ngOnInit() {
    this._eventService.getOneEvent(this.eventID).subscribe(
      (res) => {
        this.event = res;
      },
      (error) => {
        // FIXME
        console.log(error);
      }
    );
  }

}

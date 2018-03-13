import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {EventModel} from '../../_models/EventModel';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  private sub: Subscription;

  events: Array<EventModel> = [];

  constructor(private _route: ActivatedRoute) {
    this.sub = this._route.params.subscribe(
      params => {
        const category = params['key'];
        // this.getBooks(category);
        console.log(category);
      });

    const tmp0: EventModel = {
      title: 'Title 0',
      desc: 'Desc 0',
      dateStart: new Date(),
      dateEnd: new Date(),
      type: 'disease'
    };
    const tmp1: EventModel = {
      title: 'Title 1',
      desc: 'Desc 1',
      dateStart: new Date(),
      dateEnd: new Date(),
      type: 'visit'
    };
    const tmp2: EventModel = {
      title: 'Title 2',
      desc: 'Desc 2',
      dateStart: new Date(),
      type: 'visit'
    };

    this.events.push(tmp0, tmp1, tmp2, tmp0, tmp1, tmp2, tmp0, tmp1, tmp2, tmp0, tmp1, tmp2, tmp0, tmp1, tmp2);
  }

  ngOnInit() {
  }

}

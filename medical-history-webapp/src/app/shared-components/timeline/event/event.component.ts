import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from '../../../_models/EventModel';
import {MatDialog} from '@angular/material';
import {EventDialogComponent} from '../event-dialog/event-dialog.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input('event') event: EventModel;

  constructor(private _dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openEditEventDialog() {
    const dialogRef = this._dialog.open(EventDialogComponent, {
      data: {event: this.event}
    });
    dialogRef.afterClosed().subscribe((result: EventModel) => {
      if (typeof result !== 'undefined' && result !== null) {
        console.log(result);
      }
    });
  }
}

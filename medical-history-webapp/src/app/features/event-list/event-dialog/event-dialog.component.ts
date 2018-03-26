import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventModel} from '../../../core/models/EventModel';
import {DateTimeAdapter} from 'ng-pick-datetime';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../core/services/auth.service';

export enum EventOperation {
  toAdd,
  toUpdate,
  toDelete
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
})
export class EventDialogComponent implements OnInit {

  public addEventForm: FormGroup;
  eventTitle = new FormControl('', Validators.required);
  eventDate = new FormControl('', Validators.required);
  eventDesc = new FormControl();

  eventIsToUpdate: boolean;

  // PROPOSAL getByIncident types from FB
  eventTypes = [
    {name: 'VISIT', color: '#8BC34A'},
    {name: 'INFO', color: '#1976D2'},
    {name: 'DISEASE', color: '#D50000'}
  ];

  selectedType: any;

  constructor(private _dialogRef: MatDialogRef<EventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              dateTimeAdapter: DateTimeAdapter<any>,
              private auth: AuthService) {
    dateTimeAdapter.setLocale(environment.language);
  }

  /**
   * During init we check if it's dialog to add new event or to update exists.
   * If to update exists we are sets data form given Event to inputs field.
   */
  ngOnInit() {
    this.eventIsToUpdate = this.data.event !== null;
    if (this.eventIsToUpdate) {
      this.eventTitle.setValue(this.data.event.title);
      this.eventDate.setValue(this.data.event.date);
      this.eventDesc.setValue(this.data.event.desc);
      this.selectedType = this.eventTypes.find(x => x.name === this.data.event.type.name);
    }
    this.addEventForm = new FormGroup({
      title: this.eventTitle,
      date: this.eventDate,
      desc: this.eventDesc,
    });
  }

  /**
   * Method closes event dialog with no arguments
   */
  closeDialog(): void {
    this._dialogRef.close();
  }

  /**
   * Method closes event dialog with event to add and operation 'toAdd'
   */
  addEvent(): void {
    if (this.addEventForm.valid) {
      const eventModel: EventModel = {
        title: this.eventTitle.value,
        desc: this.eventDesc.value,
        date: this.eventDate.value,
        type: this.selectedType,
        incidentName: this.data.incidentName,
        userId: this.auth.userUID
      };
      this._dialogRef.close({eventModel: eventModel, operation: EventOperation.toAdd});
    }
  }

  /**
   * Method closes event dialog with event to update and operation 'toUpdate'
   */
  updateEvent(): void {
    if (this.addEventForm.valid) {
      const eventModel: EventModel = {
        title: this.eventTitle.value,
        desc: this.eventDesc.value,
        date: this.eventDate.value,
        type: this.selectedType,
        incidentName: this.data.event.incidentName,
        eventId: this.data.event.eventId,
        userId: this.data.event.userId
      };
      this._dialogRef.close({eventModel: eventModel, operation: EventOperation.toUpdate});
    }
  }

  /**
   * Method closes event dialog with event to delete and operation 'toDelete'
   */
  deleteEvent(): void {
    this._dialogRef.close({eventModel: this.data.event, operation: EventOperation.toDelete});
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventModel} from '../../../_models/EventModel';

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
  private title = new FormControl('', Validators.required);
  private date = new FormControl('', Validators.required);
  private desc = new FormControl();

  eventIsToUpdate: boolean;

  // TODO get types from FB
  eventTypes = [
    {name: 'VISIT', color: '#8BC34A'},
    {name: 'INFO', color: '#1976D2'},
    {name: 'DISEASE', color: '#D50000'}
  ];

  selectedType: any;

  constructor(private _dialogRef: MatDialogRef<EventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  /**
   * During init we check if it's dialog to add new event or to update exists.
   * If to update exists we are sets data form given Event to inputs field.
   */
  ngOnInit() {
    this.eventIsToUpdate = this.data.event !== null;

    if (this.eventIsToUpdate) {
      this.title.setValue(this.data.event.title);
      this.date.setValue(this.data.event.date);
      this.desc.setValue(this.data.event.desc);
      this.selectedType = this.eventTypes.find(x => x.name === this.data.event.type.name);

    }
    this.addEventForm = new FormGroup({
      title: this.title,
      date: this.date,
      desc: this.desc,
    });
  }

  /**
   * Method closes event dialog with no arguments
   */
  closeDialog(): void {
    this._dialogRef.close();
  }
  /**
   * Method closes event dialog with event to add/update and operation 'toAdd'/'toDelete'
   */
  addEvent(): void {
    if (this.addEventForm.valid) {
      const eventModel: EventModel = {
        title: this.title.value,
        desc: this.desc.value,
        date: this.date.value,
        type: this.selectedType
      };
      if (this.eventIsToUpdate) {
        this._dialogRef.close({eventModel: eventModel, operation: EventOperation.toUpdate});
      } else {
        this._dialogRef.close({eventModel: eventModel, operation: EventOperation.toAdd});
      }
    }
  }

  /**
   * Method closes event dialog with event to delete and operation 'toDelete'
   */
  deleteEvent(): void {
    this._dialogRef.close({eventModel: this.data.event, operation: EventOperation.toDelete});
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventModel} from '../../../_models/EventModel';

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

  updateEvent: boolean;

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

  ngOnInit() {
    this.updateEvent = this.data.event !== null;

    if (this.updateEvent) {
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

  closeDialog(): void {
    this._dialogRef.close();
  }

  addUpdateEvent(): void {
    if (this.addEventForm.valid) {
      const eventModel: EventModel = {
        title: this.title.value,
        desc: this.desc.value,
        date: this.date.value,
        type: this.selectedType
      };
      this._dialogRef.close(eventModel);
    }
  }

}

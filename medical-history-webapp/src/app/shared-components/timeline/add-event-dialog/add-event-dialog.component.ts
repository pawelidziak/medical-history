import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _moment from 'moment';


@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent implements OnInit {

  public addEventForm: FormGroup;
  private title = new FormControl('', Validators.required);
  private type = new FormControl();
  private date = new FormControl();
  private desc = new FormControl();


  // TODO get types from FB
  eventTypes = [
    {value: 'VISIT', color: '#8BC34A'},
    {value: 'INFO', color: '#1976D2'},
    {value: 'DISEASE', color: '#D50000'}
  ];

  constructor(private _dialogRef: MatDialogRef<AddEventDialogComponent>) {
  }

  ngOnInit() {
    this.addEventForm = new FormGroup({
      title: this.title,
      type: this.type,
      date: this.date,
      desc: this.desc,
    });
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  createEvent(): void {
    // TODO connect with service and add event
    this._dialogRef.close();
  }

}

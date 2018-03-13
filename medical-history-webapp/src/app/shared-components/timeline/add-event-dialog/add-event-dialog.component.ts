import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventModel} from '../../../_models/EventModel';
import {EventService} from '../../../_services/event.service';


@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent implements OnInit {

  public addEventForm: FormGroup;
  private title = new FormControl('', Validators.required);
  private type = new FormControl('', Validators.required);
  private date = new FormControl('', Validators.required);
  private desc = new FormControl();


  // TODO get types from FB
  eventTypes = [
    {name: 'VISIT', color: '#8BC34A'},
    {name: 'INFO', color: '#1976D2'},
    {name: 'DISEASE', color: '#D50000'}
  ];

  constructor(private _eventService: EventService,
              private _dialogRef: MatDialogRef<AddEventDialogComponent>) {
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
    if (this.addEventForm.valid) {
      const eventModel: EventModel = {
        title: this.title.value,
        desc: this.desc.value,
        date: this.date.value,
        type: this.type.value
      };
      this._dialogRef.close(eventModel);
      // this._eventService.addEventToFirebase(eventModel)
      //   .then((ref) => {
      //     this._dialogRef.close(ref.id);
      //   })
      //   .catch(error => console.log(error));
    }
  }

}

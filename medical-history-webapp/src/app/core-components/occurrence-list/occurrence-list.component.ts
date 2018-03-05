import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {showInOutAnimation} from '../../animations';

@Component({
  selector: 'app-occurrence-list',
  templateUrl: './occurrence-list.component.html',
  styleUrls: ['./occurrence-list.component.scss'],
  animations: [showInOutAnimation]
})
export class OccurrenceListComponent implements OnInit {

  // FIXME temporary initialized values
  userOccurrences = ['Flu', 'Orthopaedist', 'Orthodontist'];
  addNewOccurrence = false;
  occurrence = new FormControl('');
  loading: boolean;

  // TODO inject Occurrences Service
  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
    this.getUserOccurrences();
  }

  private getUserOccurrences() {
    // TODO use service method0
  }

  addOccurrence(): void {
    if (this.occurrence.value !== '') {
      // TODO use service method and add new occurrence
    }
    this.addNewOccurrence = false;
    this.occurrence.reset();
  }

}

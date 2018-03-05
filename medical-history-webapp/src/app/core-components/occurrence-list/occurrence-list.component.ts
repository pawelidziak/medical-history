import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {OccurrenceModel} from '../../_models/OccurrenceModel';

@Component({
  selector: 'app-occurrence-list',
  templateUrl: './occurrence-list.component.html',
  styleUrls: ['./occurrence-list.component.scss'],
})
export class OccurrenceListComponent implements OnInit {

  // FIXME temporary initialized values
  userOccurrences: Array<OccurrenceModel> = [];
  addNewOccurrence = false;
  occurrenceInput = new FormControl('');
  loading: boolean;

  showOccurrenceOption = false;

  // TODO inject Occurrences Service
  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
    this.getUserOccurrences();
  }

  /**
   * Method gets occurrences (of current logged user) from DB
   */
  private getUserOccurrences() {
    // TODO use service method to get occurrences
    this.userOccurrences.push(
      new OccurrenceModel('Flu', '0'),
      new OccurrenceModel('Orthopaedist', '2'),
      new OccurrenceModel('Orthodontist', '2')
    );
  }

  /**
   * Method adds new occurrence to local list and update it to DB
   */
  addOccurrence(): void {
    if (this.occurrenceInput.value !== '' && this.occurrenceInput.value !== ' ') {
      // TODO use service method and add new occurrence
      this.userOccurrences.push(new OccurrenceModel(this.occurrenceInput.value, '3'));
      this.addNewOccurrence = false;
      this.occurrenceInput.reset();
      this.saveList();
    }
  }

  /**
   * Method updates chosen occurrence in local list and update it to DB
   */
  updateOccurrence(): void {
    // CHECK IT WHEN WILL BE CONNECTION TO FIREBASE
    this.showOccurrenceOption = false;
    this.saveList();
  }

  /**
   * Method deletes chosen occurrence from local list and update it to DB
   * @param {number} index
   */
  deleteOccurrence(index: number): void {
    if (index >= 0) {
      this.userOccurrences.splice(index, 1);
      this.saveList();
    }
  }

  /**
   * Method moves chosen element up
   * @param {number} index
   */
  moveElementUp(index: number): void {
    this.moveElement(true, index);
  }

  /**
   * Method moves chosen element down
   * @param {number} index
   */
  moveElementDown(index: number): void {
    this.moveElement(false, index);
  }

  private moveElement(up: boolean, index: number): void {
    const tmp = this.userOccurrences[index];
    if (up) {
      this.userOccurrences[index] = this.userOccurrences[index - 1];
      this.userOccurrences[index - 1] = tmp;
    } else {
      this.userOccurrences[index] = this.userOccurrences[index + 1];
      this.userOccurrences[index + 1] = tmp;
    }
    this.saveList();
  }

  /**
   * Method updates local list to DB
   */
  private saveList(): void {
    // TODO connect to firebase and save changes
  }
}

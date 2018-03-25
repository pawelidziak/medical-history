import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingService {

  private _status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  private display(value: boolean) {
    this._status.next(value);
  }

  get status(): BehaviorSubject<boolean> {
    return this._status;
  }

  start() {
    this.display(true);
  }

  complete() {
    this.display(false);
  }

}

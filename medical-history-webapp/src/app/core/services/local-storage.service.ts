import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {


  constructor() {
  }

  setObject(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  getObject(key: string): any {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  removeObject(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

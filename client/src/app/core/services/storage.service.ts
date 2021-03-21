import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveData(key: string, value: any) {
    console.log(`Saving key: ${key}, value: `, value);
    localStorage.setItem(key, value);
  }

  getData(key: string): unknown {
    console.log(
      `Getting value for key: ${key}, value: `,
      localStorage.getItem(key)
    );
    return localStorage.getItem(key);
  }

  removeData(key) {
    console.log(
      `Removing value for key: ${key}, value: `,
      localStorage.getItem(key)
    );
    localStorage.removeItem(key);
  }
}

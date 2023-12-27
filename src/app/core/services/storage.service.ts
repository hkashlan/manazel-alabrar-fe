import { Injectable } from '@angular/core';

export const sessionKeys = {
  jwt: 'jwt',
  username: 'username',
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private namespace = 's';

  constructor() {}

  getItem(key: string): string | null {
    return window.localStorage.getItem(`${this.namespace}_${key}`);
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(`${this.namespace}_${key}`, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(`${this.namespace}_${key}`);
  }

  clear() {
    this.removeItem(sessionKeys.jwt);
    this.removeItem(sessionKeys.username);
  }
}

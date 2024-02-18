import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export const sessionKeys = {
  jwt: 'jwt',
  username: 'username',
};

const mockStorage: Storage = {
  length: 0,
  clear: () => {},
  getItem: () => null,
  key: () => null,
  removeItem: () => {},
  setItem: () => {},
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private namespace = 's';
  private storage: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.storage = isPlatformBrowser(platformId) ? window.localStorage : mockStorage;
  }

  getItem(key: string): string | null {
    return this.storage.getItem(`${this.namespace}_${key}`);
  }

  setItem(key: string, value: string) {
    this.storage.setItem(`${this.namespace}_${key}`, value);
  }

  removeItem(key: string) {
    this.storage.removeItem(`${this.namespace}_${key}`);
  }

  clear() {
    this.removeItem(sessionKeys.jwt);
    this.removeItem(sessionKeys.username);
  }
}

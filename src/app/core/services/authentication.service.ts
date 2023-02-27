import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private url = `http://localhost:1337/auth/local`;
  private loginTracker = new BehaviorSubject(this.isLoggedIn());

  loggedInStatus$ = this.loginTracker.asObservable();

  constructor(private ss: StorageService) {}

  saveToken(providerName: string): Promise<boolean> {
    return fetch(`http://localhost:1337/api/auth/${providerName}/callback${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        this.ss.setItem('jwt', res.jwt);
        this.ss.setItem('username', res.user.username);
        this.loginTracker.next(true);
        window.location.href = '/ar/user';
      })
      .then(() => true);
  }

  logout() {
    this.ss.clear();
    this.loginTracker.next(false);
  }

  isLoggedIn() {
    return this.ss.getItem('jwt') !== null;
  }

  getPersistedToken(): string {
    return this.ss.getItem('jwt') || '';
  }

  getAuthHeader() {
    return {
      headers: { Authorization: `Bearer ${this.getPersistedToken()}` },
    };
  }
}

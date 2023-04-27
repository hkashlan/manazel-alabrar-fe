import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading$ = new BehaviorSubject(false);
  loadingSubject$ = this.loading$.asObservable();

  updateLoading(loading: boolean) {
    this.loading$.next(loading);
  }
}

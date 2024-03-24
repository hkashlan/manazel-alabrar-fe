import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}
  createDb(): {} | Observable<{}> {
    return {
      pr: [
        {
          id: 1,
          name: 'A',
          description: 'First',
          price: 1,
        },
        {
          id: 2,
          name: 'B',
          description: 'Second',
          price: 2,
        },
        {
          id: 3,
          name: 'C',
          description: 'Thrid',
          price: 3,
        },
      ],
    };
  }
}

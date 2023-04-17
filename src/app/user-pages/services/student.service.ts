import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BFF } from '../models/schema-bff';
// import { courses, student } from './student-mock';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  loadStudent(): Observable<BFF.myPaths.Student> {
    // return of(student);
    return this.http.get<BFF.myPaths.Student>('/api/user/my-paths');
  }

  loadOpenPath(): Observable<BFF.openPath.PathInstance[]> {
    return this.http.get<BFF.openPath.PathInstance[]>('/api/user/open-paths');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BFF } from '../models/student';
// import { courses, student } from './student-mock';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  loadStudent(): Observable<BFF.Student> {
    // return of(student);
    return this.http.get<BFF.Student>('/api/user/my-paths');
  }
}

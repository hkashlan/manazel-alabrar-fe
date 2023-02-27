import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, Student } from '../models/student';
import { courses, student } from './student-mock';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  loadProfile(): Observable<Student> {
    return of(student);
  }

  loadCourses(): Observable<Course[]> {
    return of(courses);
  }

  loadStudent(): Observable<Student> {
    return of(student);
  }
}

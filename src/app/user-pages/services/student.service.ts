import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, Student } from '../models/student';
import { courses, student } from './student-mock';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  student = student;

  constructor() {}

  saveToken(): Promise<boolean> {
    return Promise.resolve(true);
    // return fetch(`/api/auth/google/callback${location.search}`)
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
    //     }
    //     return res;
    //   })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     localStorage.setItem('jwt', res.jwt);
    //     localStorage.setItem('username', res.user.username);
    //   })
    //   .then(() => true);
  }

  loadProfile(): Observable<Student> {
    return of(student);
  }

  loadCourses(): Observable<Course[]> {
    return of(courses);
  }
}

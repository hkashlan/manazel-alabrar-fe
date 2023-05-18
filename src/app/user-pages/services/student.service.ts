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

  loadStudent(): Observable<BFF.myPaths.response> {
    // return of(student);
    return this.http.get<BFF.myPaths.response>('/api/user/my-paths');
  }

  loadOpenPath(): Observable<BFF.openPath.response> {
    return this.http.get<BFF.openPath.response>('/api/user/open-paths');
  }

  register(path: number): Observable<BFF.register.response> {
    return this.http.get<BFF.register.response>('/api/user/open-paths/register/' + path);
  }

  saveProfile(firstName: string, lastName: string): Observable<BFF.saveProfile.response> {
    return this.http.post<BFF.saveProfile.response>('/api/user/open-paths/save-profile', { firstName, lastName });
  }

  finishLesson(courseId: number, lessonId: number, finished: boolean): Observable<BFF.finishLesson.response> {
    return this.http.get<BFF.finishLesson.response>(
      `/api/user/open-paths/finish-lesson/${courseId}/${lessonId}/${finished}`
    );
  }
}

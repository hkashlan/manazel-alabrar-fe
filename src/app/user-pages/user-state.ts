import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { delay } from 'rxjs';
import { Student } from './models/student';
import { StudentService } from './services/student.service';

export interface UserState {
  student: Student;
}

export const initialState: UserState = {
  student: {} as Student,
};

@Injectable()
export class UserStore extends ComponentStore<UserState> {
  readonly student$ = this.select((state) => state.student);

  constructor(private studentService: StudentService) {
    super(initialState);
    this.studentService
      .loadStudent()
      .pipe(delay(300))
      .subscribe((student) => this.patchState({ student }));
  }

  public override get() {
    return super.get();
  }
}

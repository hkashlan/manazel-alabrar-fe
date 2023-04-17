import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BFF } from './models/schema-bff';
import { LoadingService } from './services/loading-service';
import { StudentService } from './services/student.service';

export interface UserState {
  student: BFF.myPaths.Student;
  openPaths: BFF.openPath.PathInstance[];
}

export const initialState: UserState = {
  student: {} as BFF.myPaths.Student,
  openPaths: [],
};

@Injectable()
export class UserStore extends ComponentStore<UserState> {
  readonly student$ = this.select((state) => state.student);
  readonly openPath$ = this.select((state) => state.openPaths);

  constructor(private studentService: StudentService, private loadingService: LoadingService) {
    super(initialState);
    this.loadingService.updateLoading(true);
    this.studentService.loadStudent().subscribe((student) => {
      this.loadingService.updateLoading(false);
      this.patchState({ student });
    });
  }

  loadOpenPaths() {
    this.loadingService.updateLoading(true);
    this.studentService.loadOpenPath().subscribe((openPaths) => {
      this.patchState({ openPaths });
      this.loadingService.updateLoading(false);
    });
  }

  public override get() {
    return super.get();
  }
}

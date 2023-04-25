import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BFF } from './models/schema-bff';
import { LoadingService } from './services/loading-service';
import { StudentService } from './services/student.service';

export interface UserState {
  studentResponse: BFF.myPaths.response;
  openPathsResponse: BFF.openPath.response;
}

export const initialState: UserState = {
  studentResponse: {},
  openPathsResponse: {},
};

@Injectable()
export class UserStore extends ComponentStore<UserState> {
  readonly student$ = this.select((state) => state.studentResponse);
  readonly openPathResponse$ = this.select((state) => state.openPathsResponse);

  constructor(private studentService: StudentService, private loadingService: LoadingService) {
    super(initialState);
    this.loadingService.updateLoading(true);
    this.studentService.loadStudent().subscribe((student) => {
      this.loadingService.updateLoading(false);
      this.patchState({ studentResponse: student });
    });
  }

  loadOpenPaths() {
    this.loadingService.updateLoading(true);
    this.studentService.loadOpenPath().subscribe((openPaths) => {
      this.patchState({ openPathsResponse: openPaths });
      this.loadingService.updateLoading(false);
    });
  }

  register(path: number) {
    return this.studentService.register(path);
  }

  saveProfile(firstName: string, lastName: string) {
    return this.studentService.saveProfile(firstName, lastName).subscribe((response) => {
      debugger;
      this.patchState((state) => {
        state.studentResponse.data!.firstName = response.data?.firstName!;
        state.studentResponse.data!.lastName = response.data?.lastName!;
        return state;
      });
    });
  }

  public override get() {
    return super.get();
  }
}

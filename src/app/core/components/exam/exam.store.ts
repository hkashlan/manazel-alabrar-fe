import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Question } from '../../../user-pages/models/student';

export interface ExamState {
  questions: Question[];
  answers: boolean[];
  checkAnswer: boolean;
}

@Injectable()
export class ExamStore extends ComponentStore<ExamState> {
  check$ = this.select((s) => s.checkAnswer);
  answers$ = this.select((s) => s.answers);
}

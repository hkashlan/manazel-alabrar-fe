import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BFF } from '../../../user-pages/models/schema-bff';

export interface ExamState {
  questions: BFF.Question[];
  answers: boolean[];
  checkAnswer: boolean;
}

@Injectable()
export class ExamStore extends ComponentStore<ExamState> {
  check$ = this.select((s) => s.checkAnswer);
  answers$ = this.select((s) => s.answers);
}

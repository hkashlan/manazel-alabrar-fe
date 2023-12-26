import { Injectable, signal } from '@angular/core';
import { BFF } from '../../../user-pages/models/schema-bff';

export interface StudentAnswer {
  question: BFF.Question;
  isCorrect: boolean;
  answered: boolean;
}

@Injectable()
export class ExamStore {
  answers = signal<StudentAnswer[]>([]);
  checkAnswer = signal(false);
}

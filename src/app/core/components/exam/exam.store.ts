import { Injectable, signal } from '@angular/core';
import { BFF } from '../../../user-pages/models/schema-bff';

@Injectable()
export class ExamStore {
  questions = signal<BFF.Question[]>([]);
  answers = signal<boolean[]>([]);
  checkAnswer = signal(false);
}

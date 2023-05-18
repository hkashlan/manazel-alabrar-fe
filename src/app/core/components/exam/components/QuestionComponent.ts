import { computed, Directive, inject, Input } from '@angular/core';
import { ExamStore } from '../exam.store';

@Directive()
export class QuestionComponent {
  store = inject(ExamStore);

  @Input() qIndex: number = 0;

  question = computed(() => this.store.questions()[this.qIndex]);
  checkAnswer = this.store.checkAnswer;
  isCorrect: boolean = false;

  protected questionFetched() {}

  triggerScore(correct: boolean) {
    this.isCorrect = correct;
    this.store.answers.update((a) => {
      a[this.qIndex] = correct;
      return a;
    });
  }
}

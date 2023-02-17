import { Directive, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { Question } from '../../../../user-pages/models/student';
import { ExamState, ExamStore } from '../exam.store';

@Directive()
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() qIndex: number = 0;
  store = inject(ExamStore);

  question: Question = {} as Question;
  checkAnswer = false;
  isCorrect: boolean = false;

  subscription = new Subscription();

  readonly updateAnswer = this.store.updater((state: ExamState, change: { qIndex: number; correct: boolean }) => {
    state.answers[change.qIndex] = change.correct;
    return { ...state, answers: [...state.answers] };
  });

  ngOnInit(): void {
    this.fetchQuestion();

    this.subscription.add(this.store.check$.subscribe((check) => (this.checkAnswer = check)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  triggerScore(correct: boolean) {
    this.isCorrect = correct;
    this.updateAnswer({ qIndex: this.qIndex, correct });
  }

  protected questionFetched() {}

  private fetchQuestion() {
    this.store
      .select((s) => s.questions)
      .pipe(first())
      .subscribe((questions) => (this.question = questions[this.qIndex]));
  }
}

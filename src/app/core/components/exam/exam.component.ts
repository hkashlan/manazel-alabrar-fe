import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { BFF } from '../../../user-pages/models/schema-bff';
import { translationKeys } from '../../models/translations';
import { MultiChoiceComponent } from './components/multi-choice/multi-choice.component';
import { SingleChoiceComponent } from './components/single-choice/single-choice.component';
import { ExamState, ExamStore } from './exam.store';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslateModule, SingleChoiceComponent, MultiChoiceComponent],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [provideComponentStore(ExamStore)],
})
export class ExamComponent implements OnInit {
  @Input() questions: BFF.Question[] = [];

  qt = BFF.QuestionType;

  translationKeys = translationKeys;

  constructor(private examStore: ExamStore) {}

  ngOnInit(): void {
    const answers = this.questions.map(() => false);
    const initialState: ExamState = {
      questions: this.questions,
      answers,
      checkAnswer: false,
    };
    this.examStore.setState(initialState);
  }

  toggleCheck() {
    this.examStore.patchState((state) => ({ checkAnswer: !state.checkAnswer }));
  }

  // score(questionIndex: number, correct: boolean) {
  //   this.answers[questionIndex] = correct;
  // }
}

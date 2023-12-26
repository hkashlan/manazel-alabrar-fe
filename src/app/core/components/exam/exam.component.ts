import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { BFF } from '../../../user-pages/models/schema-bff';
import { translationKeys } from '../../models/translations';
import { MultiChoiceComponent } from './components/multi-choice/multi-choice.component';
import { SingleChoiceComponent } from './components/single-choice/single-choice.component';
import { ExamStore, StudentAnswer } from './exam.store';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslateModule, SingleChoiceComponent, MultiChoiceComponent],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [ExamStore],
})
export class ExamComponent implements OnInit {
  private examStore = inject(ExamStore);

  @Input() questions: BFF.Question[] = [];
  @Input({ required: true }) done: boolean = false;
  @Output() finishExam = new EventEmitter<number>();

  qt = BFF.QuestionType;
  translationKeys = translationKeys;

  disableDoneBtn = computed(() => {
    const answers = this.examStore.answers();
    const doneAllQeustions = answers.filter((a) => a.answered).length === answers.length;
    return !doneAllQeustions || this.examStore.checkAnswer();
  });

  ngOnInit(): void {
    const answers: StudentAnswer[] = this.questions.map((question) => ({
      question,
      isCorrect: false,
      answered: false,
    }));

    this.examStore.answers.set(answers);
    this.examStore.checkAnswer.set(this.done);
  }

  toggleCheck() {
    this.examStore.checkAnswer.set(!this.examStore.checkAnswer());
    const grade = this.examStore
      .answers()
      .filter((a) => a.isCorrect)
      .map((a) => a.question.mark || 1).length;
    this.finishExam.emit(grade);
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { translationKeys } from 'src/app/core/models/translations';
import { ExamComponent } from '../../../core/components/exam/exam.component';
import { StudentService } from '../../services/student.service';
import { getUserRouteInfo } from '../../user-pages-routing';
import { UserStore } from '../../user-state';

@Component({
  standalone: true,
  imports: [CommonModule, ExamComponent, TranslateModule],
  template: `
    <h1 class="header">
      {{ quiz.title }}
    </h1>
    <h4 *ngIf="quiz.mark !== undefined">{{ t.quizzes.mark | translate }} {{ quiz.mark }}</h4>
    <app-exam [questions]="questions" [done]="quiz.mark !== undefined" (finishExam)="finishExam($event)"></app-exam>
  `,
})
export class QuizComponent {
  routeInfo = getUserRouteInfo();
  t = translationKeys;
  quiz = this.routeInfo.quiz!;
  questions = this.quiz.questions!;

  studentService = inject(StudentService);
  userStore = inject(UserStore);

  finishExam(degree: number) {
    this.studentService.finishQuiz(this.routeInfo.courseId, this.routeInfo.quizId, degree).subscribe(() => {
      this.userStore.resetStudent();
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExamComponent } from '../../../core/components/exam/exam.component';
import { getUserRouteInfo } from '../../user-pages-routing';

@Component({
  standalone: true,
  imports: [CommonModule, ExamComponent],
  template: `
    <h1 class="header">{{ quiz.title }}</h1>
    <app-exam [questions]="questions" [done]="false"></app-exam>
  `,
})
export class QuizComponent {
  routeInfo = getUserRouteInfo();
  quiz = this.routeInfo.quiz!;
  questions = this.quiz.questions!;
}

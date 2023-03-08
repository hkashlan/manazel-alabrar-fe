import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableColumn } from '../../../core/components/table/table';
import { QuizzesPageFromToTransParams, translationKeys } from '../../../core/models/translations';
import { CoreModule } from '../../../core/modules/core.module';
import { BFF } from '../../models/student';
import { QuizParams } from '../../user-pages-routing';
import { UserStore } from '../../user-state';
import { canTakeQuiz } from '../../utils/quiz-utils';

interface QuizInfo {
  facultyName: string;
  courseName: string;
  quizName: string;
  mark?: number;
  canTake: boolean;
  fromTo: string;
  quizParams: QuizParams;
}

@Component({
  standalone: true,
  imports: [CoreModule],
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent {
  translationKeys = translationKeys;

  courses: BFF.Course[] = [];

  quizzes: QuizInfo[] = this.getQuizzes();
  quizzesTableColumns: TableColumn<QuizInfo>[] = this.initializeColumns();

  constructor(private userStore: UserStore, private datePipe: DatePipe, private translateService: TranslateService) {}

  initializeColumns(): TableColumn<QuizInfo>[] {
    return [
      {
        name: 'exam',
        dataKey: 'quizName',
      },
      {
        name: 'faculty',
        dataKey: 'facultyName',
      },
      {
        name: 'course',
        dataKey: 'courseName',
      },
      {
        name: 'fromTo',
        dataKey: 'fromTo',
      },
      {
        name: 'mark',
        dataKey: 'mark',
      },
    ];
  }

  private createQuizInfo(faculty: BFF.Faculty, course: BFF.Course, quiz: BFF.Quiz, quizIndex: number): QuizInfo {
    const fromTo = this.translateService.instant(translationKeys.quizzesPage.from_to, {
      from: this.datePipe.transform(quiz.dateFrom),
      to: this.datePipe.transform(quiz.dateTo),
    } as QuizzesPageFromToTransParams);
    return {
      facultyName: faculty.title,
      courseName: course.title,
      quizName: quiz.title,
      mark: quiz.mark,
      canTake: canTakeQuiz(quiz),
      fromTo,
      quizParams: {
        facultyId: faculty.id,
        courseId: course.id,
        quizId: quizIndex,
      },
    };
  }

  getQuizzes(): QuizInfo[] {
    return this.userStore
      .get()
      .student.faculties.map((f) =>
        f.courses.map((c) => c.quizzes.map((q, index) => this.createQuizInfo(f, c, q, index)))
      )
      .flat()
      .flat();
  }
}

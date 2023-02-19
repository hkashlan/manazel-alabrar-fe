import { Component } from '@angular/core';
import { ExamComponent } from '../../../core/components/exam/exam.component';
import { translationKeys } from '../../../core/models/translations';
import { SharedModule } from '../../../core/modules/shared.module';
import { getRouteNumberParam } from '../../../core/utils/params';
import { UserParameters } from '../../user-pages-routing';
import { UserStore } from '../../user-state';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SharedModule, ExamComponent],
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent {
  lessonId = getRouteNumberParam(UserParameters.lessonId);
  courseId = getRouteNumberParam(UserParameters.courseId);
  facultyId = getRouteNumberParam(UserParameters.facultyId);
  faculty = this.userStore.get().student.faculties.find((f) => f.id === this.facultyId);
  course = this.faculty?.courses.find((c) => c.id === this.courseId);
  lesson = this.course?.lessons.find((l) => l.lessonId === this.lessonId);

  translationKeys = translationKeys;

  constructor(private userStore: UserStore) {}
}

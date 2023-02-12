import { Component } from '@angular/core';
import { translationKeys } from '../../../core/models/translations';
import { SharedModule } from '../../../core/modules/shared/shared.module';
import { getRouteNumberParam } from '../../../core/utils/params';
import { StudentService } from '../../services/student.service';
import { UserParameters } from '../../user-pages-routing';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent {
  lessonId = getRouteNumberParam(UserParameters.lessonId);
  courseId = getRouteNumberParam(UserParameters.courseId);
  facultyId = getRouteNumberParam(UserParameters.facultyId);
  faculty = this.studentService.student.faculties.find(
    (f) => f.id === this.facultyId
  );
  course = this.faculty?.courses.find((c) => c.id === this.courseId);
  lesson = this.course?.lessons.find((l) => l.lessonId === this.lessonId);

  translationKeys = translationKeys;
  constructor(private studentService: StudentService) {}
}

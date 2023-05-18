import { Component, HostBinding, inject } from '@angular/core';

import { ExamComponent } from '../../../core/components/exam/exam.component';
import { translationKeys } from '../../../core/models/translations';
import { SharedModule } from '../../../core/modules/shared.module';
import { SafePipe } from '../../../core/pipes/safe-url.pipe';
import { StudentService } from '../../services/student.service';
import { getUserRouteInfo } from '../../user-pages-routing';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SharedModule, ExamComponent, SafePipe],
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent {
  private studentService = inject(StudentService);

  @HostBinding('class') class = 'page';

  routeInfo = getUserRouteInfo();
  lesson = this.routeInfo.lesson;
  course = this.routeInfo.course;

  translationKeys = translationKeys;

  finishLesson(finished: boolean) {
    this.studentService
      .finishLesson(this.routeInfo.course.id, this.routeInfo.lessonId, finished)
      .subscribe((result) => {
        console.log(result);
      });
  }
}

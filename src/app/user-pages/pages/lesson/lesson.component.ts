import { Component } from '@angular/core';
import { ExamComponent } from '../../../core/components/exam/exam.component';
import { translationKeys } from '../../../core/models/translations';
import { SharedModule } from '../../../core/modules/shared.module';
import { getUserRouteInfo } from '../../user-pages-routing';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SharedModule, ExamComponent],
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent {
  routeInfo = getUserRouteInfo();
  lesson = this.routeInfo.lesson;
  course = this.routeInfo.course;

  translationKeys = translationKeys;
}

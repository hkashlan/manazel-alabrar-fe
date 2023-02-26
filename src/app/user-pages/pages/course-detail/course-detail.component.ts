import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableColumn } from '../../../core/components/table/table';
import { ColumnDefinition, TableComponent } from '../../../core/components/table/table.component';
import { translationKeys } from '../../../core/models/translations';
import { YesNoTranslatePipe } from '../../../core/yes-no-translate.pipe';
import { Lesson } from '../../models/student';
import { getUserRouteInfo, userPageRouting } from '../../user-pages-routing';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, TableComponent, ColumnDefinition, MatTableModule, TranslateModule, RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent {
  translationKeys = translationKeys;
  lessonRouter = userPageRouting.lesson.path;

  routeInfo = getUserRouteInfo();
  facultyId = this.routeInfo.facultyId;
  courseId = this.routeInfo.courseId;
  course = this.routeInfo.course;
  lessons = this.course?.lessons!;

  ordersTableColumns: TableColumn<Lesson>[] = this.initializeColumns();

  initializeColumns(): TableColumn<Lesson>[] {
    const yesNoTranslatePipe = new YesNoTranslatePipe();
    return [
      {
        name: translationKeys.lesson,
        dataKey: 'name',
        position: 'left',
      },
      {
        name: translationKeys.lesson_finished,
        dataKey: 'done',
        pipe: yesNoTranslatePipe,
      },
      {
        name: translationKeys.lesson_present,
        dataKey: 'present',
        pipe: yesNoTranslatePipe,
      },
      {
        name: translationKeys.lesson_mark,
        dataKey: 'mark',
      },
    ];
  }
}

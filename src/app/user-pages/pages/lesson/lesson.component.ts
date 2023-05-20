import { Component, ElementRef, HostBinding, Inject, inject } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ExamComponent } from '../../../core/components/exam/exam.component';
import { translationKeys } from '../../../core/models/translations';
import { SharedModule } from '../../../core/modules/shared.module';
import { SafePipe } from '../../../core/pipes/safe-url.pipe';
import { StudentService } from '../../services/student.service';
import { getUserRouteInfo } from '../../user-pages-routing';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SharedModule, ExamComponent, SafePipe, NgxExtendedPdfViewerModule],
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent {
  private studentService = inject(StudentService);

  @HostBinding('class') class = 'page';

  routeInfo = getUserRouteInfo();
  lesson = this.routeInfo.lesson!;
  course = this.routeInfo.course;

  translationKeys = translationKeys;
  elem: any;

  constructor(@Inject(DOCUMENT) private document: any, public element: ElementRef<Element>) {}

  toggleFullScreen() {
    this.elem = this.element.nativeElement.querySelector('ngx-extended-pdf-viewer');
    if (document.fullscreenElement !== null) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
  }
  finishLesson(finished: boolean) {
    this.studentService.finishLesson(this.routeInfo.course.id, this.routeInfo.lessonId, finished).subscribe();
  }

  finishExam(mark: number) {
    this.lesson.mark = mark;
    this.studentService.finishExam(this.routeInfo.course.id, this.routeInfo.lessonId, mark).subscribe();
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}

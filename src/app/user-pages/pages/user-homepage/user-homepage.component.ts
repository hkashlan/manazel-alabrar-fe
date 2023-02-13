import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { Course, Lesson } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { LessonParams, userPageRouting } from '../../user-pages-routing';

function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

interface LessonItem {
  courseName: string;
  lessonName: string;
  lessonParams: LessonParams;
}

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss'],
})
export class UserHomepageComponent implements OnInit {
  currentDate = new Date();
  lessons: LessonItem[] = [];
  lessonRouter = userPageRouting.lesson.path;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.changeDate(0);
  }

  nextDate(): void {
    this.changeDate(-1);
  }

  previousDate(): void {
    this.changeDate(1);
  }

  private filterCourses() {
    this.lessons = [];
    var courses = this.studentService.student.faculties
      .map((faculty) => faculty.courses)
      .flat();

    for (const course of courses) {
      this.lessons.push(
        ...course.lessons
          .filter((lesson) => sameDay(lesson.date, this.currentDate))
          .map((lesson) => this.createLessonItem(course, lesson))
      );
    }
  }

  private createLessonItem(course: Course, lesson: Lesson) {
    return {
      courseName: course.name,
      lessonName: lesson.name,
      lessonParams: {
        courseId: course.id,
        lessonId: lesson.lessonId,
        facultyId: course.facultyId,
      },
    };
  }

  private changeDate(add: number): void {
    this.currentDate = new Date(
      this.currentDate.setDate(this.currentDate.getDate() + add)
    );
    this.filterCourses();
  }
}

import { inject } from '@angular/core';
import { RouteInfo } from '../core/models/route-info';
import { getRouteNumberParam } from '../core/utils/params';
import { BFF } from './models/student';
import { UserStore } from './user-state';

export interface CourseDetailParams {
  [UserParameters.courseId]: number;
}

export interface LessonParams {
  [UserParameters.facultyId]: number;
  [UserParameters.courseId]: number;
  [UserParameters.lessonId]: number;
}

export interface QuizParams {
  [UserParameters.facultyId]: number;
  [UserParameters.courseId]: number;
  [UserParameters.quizId]: number;
}

export interface MenuInfo {
  path: string;
  title: string;
}

export enum UserParameters {
  courseId = 'courseId',
  lessonId = 'lessonId',
  facultyId = 'facultyId',
  quizId = 'quizId',
}

const home: RouteInfo = { path: 'home' };
const course: RouteInfo = { path: 'course' };
const courseDetail: RouteInfo = {
  path: 'course',
  parameters: [UserParameters.facultyId, UserParameters.courseId],
};
const lesson: RouteInfo = {
  path: 'lesson',
  parameters: [UserParameters.facultyId, UserParameters.courseId, UserParameters.lessonId],
};
const quiz: RouteInfo = {
  path: 'quiz',
  parameters: [UserParameters.facultyId, UserParameters.courseId, UserParameters.quizId],
};

const quizzes: RouteInfo = {
  path: 'quiz',
};

export const userPageRouting = {
  home,
  course,
  courseDetail,
  lesson,
  quizzes,
  quiz,
};

export const menus: MenuInfo[] = [
  {
    path: home.path,
    title: 'الصفحة الرئيسية',
  },
  {
    path: course.path,
    title: 'المقرارات',
  },
  {
    path: quizzes.path,
    title: 'الاختبارات',
  },
];

export interface UserRouteInfo {
  [UserParameters.facultyId]: number;
  [UserParameters.courseId]: number;
  [UserParameters.lessonId]: number;
  [UserParameters.quizId]: number;

  faculty: BFF.Faculty;
  course: BFF.Course;
  lesson?: BFF.Lesson;
  quiz?: BFF.Quiz;
}

export function getUserRouteInfo(): UserRouteInfo {
  const userStore = inject(UserStore);

  const facultyId = getRouteNumberParam(UserParameters.facultyId);
  const courseId = getRouteNumberParam(UserParameters.courseId);
  const lessonId = getRouteNumberParam(UserParameters.lessonId);
  const quizId = getRouteNumberParam(UserParameters.quizId);

  const faculty = userStore.get().student.faculties.find((f) => f.id === facultyId)!;
  const course = faculty?.courses.find((c) => c.id === courseId)!;
  const lesson = course?.lessons.find((l) => l.lessonId === lessonId);
  const quiz = course?.quizzes[quizId];

  return { facultyId, courseId, lessonId, quizId, faculty, course, lesson, quiz };
}

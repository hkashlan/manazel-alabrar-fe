import { RouteInfo } from '../core/models/route-info';

export interface CourseDetailParams {
  [UserParameters.courseId]: number;
}

export interface LessonParams {
  [UserParameters.courseId]: number;
  [UserParameters.lessonId]: number;
  [UserParameters.facultyId]: number;
}

export interface QuizParams extends LessonParams {}

export interface MenuInfo {
  path: string;
  title: string;
}

export enum UserParameters {
  courseId = 'courseId',
  lessonId = 'lessonId',
  facultyId = 'facultyId',
}

const home: RouteInfo = { path: 'home' };
const course: RouteInfo = { path: 'course' };
const courseDetail: RouteInfo = {
  path: 'course',
  parameters: [UserParameters.facultyId, UserParameters.courseId],
};
const lesson: RouteInfo = {
  path: 'lesson',
  parameters: [
    UserParameters.facultyId,
    UserParameters.courseId,
    UserParameters.lessonId,
  ],
};
const quiz: RouteInfo = {
  path: 'quiz',
  parameters: [
    UserParameters.facultyId,
    UserParameters.courseId,
    UserParameters.courseId,
  ],
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

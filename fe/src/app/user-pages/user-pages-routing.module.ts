import { Routes } from '@angular/router';
import { getRouteUrl } from '../core/models/route-info';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { PathComponent } from './pages/path/path.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { UserHomepageComponent } from './pages/user-homepage/user-homepage.component';
import { userPageRouting } from './user-pages-routing';

export const userRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: userPageRouting.home.path,
  },
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: userPageRouting.home.path,
        component: UserHomepageComponent,
      },
      {
        path: getRouteUrl(userPageRouting.course),
        component: CoursesComponent,
      },
      {
        path: getRouteUrl(userPageRouting.profile),
        component: ProfileComponent,
      },
      {
        path: getRouteUrl(userPageRouting.courseDetail),
        component: CourseDetailComponent,
      },
      {
        path: getRouteUrl(userPageRouting.path),
        component: PathComponent,
      },
      {
        path: getRouteUrl(userPageRouting.lesson),
        component: LessonComponent,
      },
      {
        path: getRouteUrl(userPageRouting.quizzes),
        component: QuizzesComponent,
      },
      {
        path: getRouteUrl(userPageRouting.quiz),
        component: QuizComponent,
      },
    ],
  },
];

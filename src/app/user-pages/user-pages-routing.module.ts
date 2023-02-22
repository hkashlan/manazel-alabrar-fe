import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getRouteUrl } from '../core/models/route-info';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { QuizComponent } from './pages/quizes/quizes.component';
import { UserHomepageComponent } from './pages/user-homepage/user-homepage.component';
import { userPageRouting } from './user-pages-routing';

const routes: Routes = [
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
        path: getRouteUrl(userPageRouting.courseDetail),
        component: CourseDetailComponent,
      },
      {
        path: getRouteUrl(userPageRouting.lesson),
        component: LessonComponent,
      },
      {
        path: getRouteUrl(userPageRouting.quizzes),
        component: QuizComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPagesRoutingModule {}

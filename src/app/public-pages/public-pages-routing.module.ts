import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentService } from '../user-pages/services/student.service';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'callback',
    pathMatch: 'full',
    canMatch: [() => inject(StudentService).saveToken()],
    redirectTo: '/user/user-home',
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}

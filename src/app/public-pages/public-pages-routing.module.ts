import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../core/services/user.service';
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
    canMatch: [() => inject(UserService).saveToken()],
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

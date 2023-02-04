import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./user-pages/user-pages-routing.module').then(
        (m) => m.UserPagesRoutingModule
      ),
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./public-pages/public-pages-routing.module').then(
        (m) => m.PublicPagesRoutingModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ar',
    pathMatch: 'full',
  },
  {
    path: ':language',
    resolve: {
      translate: (route: ActivatedRouteSnapshot) => {
        const language = route.params['language'];
        const translateService = inject(TranslateService);
        return translateService.use(language!);
      },
    },
    children: [
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

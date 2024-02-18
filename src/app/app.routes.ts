import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './core/services/authentication.service';
import { userRoutes } from './user-pages/user-pages-routing.module';

export const routes: Routes = [
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
        path: '',
        pathMatch: 'full',
        canMatch: [() => inject(AuthenticationService).isLoggedIn()],
        redirectTo: 'user',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'public',
      },
      {
        path: 'user',
        children: userRoutes,
        canMatch: [() => inject(AuthenticationService).isLoggedIn()],
      },
      {
        path: 'public',
        loadChildren: () =>
          import('./public-pages/public-pages-routing.module').then((m) => m.PublicPagesRoutingModule),
      },
    ],
  },
];

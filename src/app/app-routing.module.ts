import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './core/services/authentication.service';

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
        path: '',
        pathMatch: 'full',
        canMatch: [
          () => {
            const tt = inject(AuthenticationService).isLoggedIn();
            debugger;
            console.log('tt' + tt);
            return tt;
          },
        ],
        redirectTo: 'user',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'public',
      },
      {
        path: 'user',
        loadChildren: () => import('./user-pages/user-pages-routing.module').then((m) => m.UserPagesRoutingModule),
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

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

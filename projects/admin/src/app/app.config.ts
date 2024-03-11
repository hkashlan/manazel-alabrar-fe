import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(MatNativeDateModule),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
  ],
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingInterceptor } from './shared/interceptor/loading.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';
//import { loadingInterceptor } from './shared/interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration() , provideHttpClient(withInterceptorsFromDi(),
    ),  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
    , provideAnimations() ,provideToastr({
    timeOut: 3000,
    positionClass: 'toast-bottom-right',
    //preventDuplicates: true,
  }),provideRouter(routes)]
};

//provideHttpClient(withInterceptors([loadingInterceptor]))
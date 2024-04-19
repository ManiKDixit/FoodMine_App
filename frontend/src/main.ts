import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { LoadingInterceptor} from './app/shared/interceptor/loading.interceptor';
//import { loadingInterceptor } from './app/shared/interceptor/loading.interceptor';

bootstrapApplication(AppComponent, appConfig )
  .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [
//     //routes
//     // provideRouter(routes), 
//     // // http client
//     // provideHttpClient(
//     //   // registering interceptors
//     //   withInterceptors([loadingInterceptor]) 
//     // )
//     // provideHttpClient(
//     //   withInterceptorsFromDi(),
//     //   withInterceptors([])
//     // ),
//     // { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }

// ]
// }).catch((err) => console.error(err));
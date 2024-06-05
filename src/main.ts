import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import {provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/auth.interceptor';
import { appInterceptor } from './app/app.interceptor';



bootstrapApplication(AppComponent, {
  providers:[
    provideRouter(routeConfig),
    provideHttpClient(withInterceptors([authInterceptor, appInterceptor]))

  ]
})
  .catch((err) => console.error(err));

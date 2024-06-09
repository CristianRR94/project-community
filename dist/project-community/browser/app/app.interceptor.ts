import { HttpInterceptorFn } from '@angular/common/http';


export const appInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('app interceptor...');
  return next(req);
};

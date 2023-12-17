import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      'x-rapidapi-key': '4861e1ef198d48f5785fb26771174df3'
    }
  });
  return next(authReq);
};

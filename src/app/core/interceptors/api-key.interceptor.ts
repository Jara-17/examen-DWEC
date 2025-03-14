// src/app/core/interceptors/api-key.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.apiKey;
  const modifiedReq = req.clone({
    setHeaders: {
      'x-api-key': apiKey
    }
  });
  return next(modifiedReq);
};

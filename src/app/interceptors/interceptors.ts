import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const Authorization = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const modifiedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer gerighrjlgkerg'),
    });
    return next(modifiedReq);
}
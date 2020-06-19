import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../app/_services/token-storage.service';
import { Observable } from 'rxjs';

//class to transform HttpRequests before they are sent to backend. 
//Appends information to tokens

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;

        const token = this.token.getToken();

        if (token != null) {

            authReq = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
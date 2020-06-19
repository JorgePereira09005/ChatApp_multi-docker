import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {}

  login(user:string, pass: string): Observable<any> {

    return this.httpClient.post(AUTH_API + 'signin', {
      username: user,
      password: pass
    }, httpOptions);
  }

  register(user): Observable<any> {

    return this.httpClient.post(AUTH_API + 'signup', {
      username: user.username,
      email:  user.email,
      profilePic: user.profilePic,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      description: user.description
    }, httpOptions);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
/* import { ErrorObservable } from 'rxjs/observable/ErrorObservable'; */
import { map, catchError } from 'rxjs/operators'
/* import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; */
import { Message } from 'src/app/_entities/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  url: string = "http://localhost:8080/" + "api/socket";

  constructor(private http: HttpClient) { }

  post(data: Message) {
    return this.http.post(this.url, data).pipe(
      map((data: Message) => {
        return data;
      }),
      catchError(err => {
        throw new Error(err.console.error());
      })
    );
  }

  //https://angular.io/guide/rx-library
  /* const apiData = ajax('/api/data').pipe(
    map(res => {
      if (!res.response) {
        throw new Error('Value expected!');
      }
      return res.response;
    }),
    catchError(err => of([]))
  ); */



  /* post(data: Message) {
    return this.http.post(this.url, data)
      .map((data: Message) => { return data; })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
  } */


}

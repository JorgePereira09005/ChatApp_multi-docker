import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../_entities/post';
import { Observable } from 'rxjs';
import { FriendRequest } from '../_entities/friend-request';
import { User } from '../_entities/user';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class BackendRequestService {

  constructor(private httpClient: HttpClient) { }

  getUserPosts(id: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(API_URL + `posts/user/${id}`);
  }

  getFriendRequests(userId: number): Observable<FriendRequest[]> {
    return this.httpClient.get<FriendRequest[]>(API_URL + `friendrequests/user/${userId}`);
  }

  acceptFriendRequest(friendRequest: FriendRequest): Observable<string> {

    return this.httpClient.post(API_URL + `friendrequests/accept`, friendRequest, {responseType: 'text'});
  }

  declineFriendRequest(friendRequest: FriendRequest): Observable<string> {
    return this.httpClient.post(API_URL + `friendrequests/decline`, friendRequest, {responseType: 'text'});
  }

  sendReply(post: Post): Observable<any>  {
    return this.httpClient.post<Post>(API_URL + `posts`, post);
  }

  getUserBasedOnUsername(username: string): Observable<User>{
    return this.httpClient.get<User>(API_URL + `users/${username}`);
  }
  
  sendFriendRequest(friendRequest: FriendRequest): Observable<string> {
    return this.httpClient.post(API_URL + 'friendrequests', friendRequest, {responseType: 'text'});
  }
}

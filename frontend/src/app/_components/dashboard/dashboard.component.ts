import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { BackendRequestService } from 'src/app/_services/backend-request.service';
import { Post } from 'src/app/_entities/post';
import { FriendRequest } from 'src/app/_entities/friend-request';
import { User } from 'src/app/_entities/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  posts: Post[] = [];

  friends = new Set<User>();
  pendingRequests: FriendRequest[] = [];
  requestsSent: FriendRequest[] = [];

  postsShowing = new Set<number>();

  constructor(private tokenStorageService: TokenStorageService,
    private backendService: BackendRequestService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.getUserPosts(this.user.id);
    this.getFriendRequests(this.user.id);
  }

  getUserPosts(userId: number) {
    this.backendService.getUserPosts(userId).subscribe(
      data => {

        for (let post of data) {
          if (post.parentpostid == null) {
            this.posts.push(post);
          }
        }
      }
    )
  }

  getFriendRequests(userId: number) {
    this.backendService.getFriendRequests(userId).subscribe(
      data => {
        for (let friendrequest of data) {
          //if friendrequest.accepted == true, check if the requester is the logged-in user. If so,
          //add friendrequest.requested_to user to the friends list (since we know the request was made from the logged in user to requested_to user and if it's accepted, the requested_to user is a friend).
          //Otherwise, add the requester to the friends list
          if (friendrequest.accepted) {
            friendrequest.requester.username == this.user.username ? this.friends.add(friendrequest.requested_to) : this.friends.add(friendrequest.requester);
          }
          else if (friendrequest.requester.username != this.user.username) {
            this.pendingRequests.push(friendrequest);
          }
          else {
            this.requestsSent.push(friendrequest);
          }
        }
      }
    )
  }

  showReplyBox(id: number) {
    if (this.postsShowing.has(id)) {
      this.postsShowing.delete(id);
    } else {
      this.postsShowing.add(id);
    }
  }

  sendReply(reply: any, parentId: number) {

    if (reply.value != '') {
      let newPost = new Post();
      newPost.datePost = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      newPost.postedBy = this.user;
      newPost.parentpostid = parentId;
      newPost.content = reply.value;

      this.backendService.sendReply(newPost).subscribe(
        data => {
          window.location.reload();
        }
      )
    }
  }

  createNewPost(post: any) {

    if (post.value != '') {
      let newPost = new Post();
      newPost.datePost = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      newPost.postedBy = this.user;
      newPost.content = post.value;
      /* newPost.parentpostid = 0; */

      this.backendService.sendReply(newPost).subscribe(
        data => {
          window.location.reload();
        }
      )
    }
  }

  acceptFriendRequest(friendRequest: FriendRequest) {
    this.backendService.acceptFriendRequest(friendRequest).subscribe(
      data => {

        //remove accepted friend request from the list of pending requests and add it to the list of friends
        let index: number = 0;
        for (index; index < this.pendingRequests.length; index++) {
          if (this.pendingRequests[index].id == friendRequest.id) {
            this.pendingRequests.splice(index, 1);
          }
        }

        this.friends.add(friendRequest.requester);

        //display alert message to confirm friend has been added
        document.getElementById('friendAcceptedAlert').style.display = "block";

        setTimeout( () => {
          document.getElementById('friendAcceptedAlert').style.display = "none";
        }, 3000);

      }
    )
  }

  declineFriendRequest(friendRequest: FriendRequest) {
    this.backendService.declineFriendRequest(friendRequest).subscribe(
      data => {

        //remove declined friend request from the list of pending requests 
        let index: number = 0;
        for (index; index < this.pendingRequests.length; index++) {
          if (this.pendingRequests[index].id == friendRequest.id) {
            this.pendingRequests.splice(index, 1);
          }
        }

        //display alert message to confirm friend has been added
        document.getElementById('friendDeclinedAlert').style.display = "block";

        setTimeout( () => {
          document.getElementById('friendDeclinedAlert').style.display = "none";
        }, 3000);

      }
    )
  }

}

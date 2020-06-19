import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendRequestService } from 'src/app/_services/backend-request.service';
import { User } from 'src/app/_entities/user';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ThrowStmt } from '@angular/compiler';
import { Post } from 'src/app/_entities/post';
import { FriendRequest } from 'src/app/_entities/friend-request';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();
  loggedInUser: User = new User();
  posts: Post[] = [];
  postsShowing = new Set<number>();

  constructor(private route: ActivatedRoute,
    private backendService: BackendRequestService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.route.paramMap.subscribe(() => {
      this.getUserBasedOnUsername();
    });

    // search for posts only if user exists
    if (this.user) {
      setTimeout( () => {
        this.getUserPosts(this.user.id);
      }, 250);
    }
    
    //check to see if the person currently viewing this user page is logged in
    this.loggedInUser = this.tokenStorageService.getUser();
  }

  getUserBasedOnUsername() {
    const name: string = this.route.snapshot.paramMap.get('username');

    console.log("Getting user " + name);
    this.backendService.getUserBasedOnUsername(name).subscribe(
      data => {
        this.user.id = data.id;
        this.user.username = data.username;
        this.user.description = data.description;
        this.user.profilePic = data.profilePic;
        this.user.email = data.email;
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
      },
      err => {
        //set user to null if it doesn't exist in the database
        this.user = null;
      }
    );
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
      newPost.postedBy = this.loggedInUser;
      newPost.parentpostid = parentId;
      newPost.content = reply.value;
      newPost.parentpostid = parentId;

      this.backendService.sendReply(newPost).subscribe(
        data => {
          window.location.reload();
        }
      )
    }
  }

  sendFriendRequest() {

    //send a new friend request to the backend and retrieve and display the response message
    const friendRequest = new FriendRequest();

    friendRequest.requester = this.loggedInUser;
    friendRequest.requested_to = this.user;
    friendRequest.requesterId = this.loggedInUser.id;
    friendRequest.requestedToId = this.user.id;
    friendRequest.accepted = false;
    friendRequest.acceptDate = null;

    this.backendService.sendFriendRequest(friendRequest).subscribe(
      data => {
        //display alert message to confirm friend request has been sent
        document.getElementById('friendRequestSent').style.display = "block";
        document.getElementById('friendRequestSent').innerHTML=`<b>${data}</b>`

        setTimeout( () => {
          document.getElementById('friendRequestSent').innerHTML= '';
          document.getElementById('friendRequestSent').style.display = "none";
        }, 3000);
      },
      err => {
        document.getElementById('friendRequestSent').style.display = "block";
        document.getElementById('friendRequestSent').innerHTML=`<b>${err.error}</b>`

        setTimeout( () => {
          document.getElementById('friendRequestSent').innerHTML= '';
          document.getElementById('friendRequestSent').style.display = "none";
        }, 4000);
      }
    )
  }

}

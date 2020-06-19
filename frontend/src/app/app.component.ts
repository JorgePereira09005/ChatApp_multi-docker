import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  searchForUser(username: string) {
    /* this.router.navigateByUrl(`/user/${username}`); */

    this.router.navigate([`/user/${username}`])
      .then(() => {
        
        window.location.reload();
        
      });
  }

}

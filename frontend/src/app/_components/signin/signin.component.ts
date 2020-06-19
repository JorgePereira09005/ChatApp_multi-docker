import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  /* returnUrl: string; */

  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private tokenStorage: TokenStorageService) {

    // redirect to user dashboard if already logged in
    if (this.tokenStorage.getToken()) {
      console.log("User already logged id: " + tokenStorage.getUser());
      this.router.navigate(['dashboard']);
    }

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get getForm() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.getForm.username.value, this.getForm.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['dashboard']);
          window.location.reload();
        },
        error => {
          this.loading = false;
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        });
  }
}

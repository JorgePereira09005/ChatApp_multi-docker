import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  //TODO: what to do when user attempts to register when he is already logged in;
  //      redirection after logging in/registering


  registerForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, 
                   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      profilePic: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      description: ['']
    });
  }

  // getter to access the form fields
  get getForm() {return this.registerForm.controls;}

  onSubmit() {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.registerForm.value).pipe(first()).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        //TODO: router navigate to "dashboard" page after registering/logging in
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 1500);   
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.loading = false;
      }
    )
  }

}

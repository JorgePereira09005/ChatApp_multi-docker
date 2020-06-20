import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './_components/home/home.component';
import { SignupComponent } from './_components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './_components/signin/signin.component';

import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { UserComponent } from './_components/user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SocketService } from './_services/socket.service';
import { ChatComponent } from './_components/chat/chat.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        AppRoutingModule,
        ToastrModule.forRoot({ timeOut: 3000 }),
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  /* it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ChatApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ChatApp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ChatApp app is running!');
  });
}); */

it('renders without crashing', () => {

});
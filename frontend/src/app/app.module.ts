import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { SignupComponent } from './_components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './_components/signin/signin.component';

import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { UserComponent } from './_components/user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SocketService } from './_services/socket.service';
import { ChatComponent } from './_components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    UserComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({ timeOut: 3000 }),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

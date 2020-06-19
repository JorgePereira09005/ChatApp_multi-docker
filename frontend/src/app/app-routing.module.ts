import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/_helpers/auth.guard';
import { HomeComponent } from './_components/home/home.component';
import { SignupComponent } from './_components/signup/signup.component';
import { SigninComponent } from './_components/signin/signin.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { UserComponent } from './_components/user/user.component';
import { ChatComponent } from './_components/chat/chat.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent, pathMatch: 'full', canActivate: [AuthGuard]  },
  { path: 'user/:username', component: UserComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

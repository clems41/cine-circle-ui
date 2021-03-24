import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { LoginComponent } from './login/login.component';
import { CircleComponent } from './circle/circle.component';
import { CircleDetailComponent } from './circle-detail/circle-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserComponent },
  { path: 'circles', component: CircleComponent },
  { path: 'circle/:id', component: CircleDetailComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'movie/:id', component: MovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
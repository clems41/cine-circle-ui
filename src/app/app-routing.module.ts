import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { LoginComponent } from './login/login.component';
import { CircleComponent } from './circle/circle.component';
import { CircleDetailComponent } from './circle-detail/circle-detail.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'users', component: UserComponent },
  { path: 'circles', component: CircleComponent },
  { path: 'circle/:id', component: CircleDetailComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'movies', component: MovieSearchComponent },
  { path: 'watchlist', component: WatchlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
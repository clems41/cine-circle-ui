import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { LoginComponent } from './login/login.component';
import { CircleComponent } from './circle/circle.component';
import { CircleDetailComponent } from './circle-detail/circle-detail.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SignupComponent } from './signup/signup.component'; // <-- NgModel lives here

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailComponent,
    MessagesComponent,
    UserSearchComponent,
    MovieDetailComponent,
    LoginComponent,
    CircleComponent,
    CircleDetailComponent,
    MovieSearchComponent,
    WatchlistComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

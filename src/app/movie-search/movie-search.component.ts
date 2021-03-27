import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { LoginService } from '../login.service';

import { Movie, MovieShort } from '../movie';
import { MovieSearch } from '../movie';
import { MovieService } from '../movie.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<MovieSearch>;
  userMovies: Movie[];
  user: User;
  mediaType = "movie";

  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService,
    private loginService: LoginService,
    private userService: UserService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  getMovies(): void {
    if (this.user) {
      this.userService.getMoviesForUser(this.user.id)
        .subscribe(movies => {
          this.userMovies = movies;
        });
    }
  }

  ngOnInit(): void {
    console.log(this);
    this.user = this.loginService.getLoggedUser();
    this.getMovies();
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieService.searchMovies(term, this.mediaType)),
    );
  }
}
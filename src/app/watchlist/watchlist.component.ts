import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { MovieSearch } from '../movie';
import { User } from '../user';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  movies: MovieSearch;
  user: User;

  constructor(private watchlistService: WatchlistService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getLoggedUser();
    this.getMovies();
  }

  getMovies(): void {
    if (this.user) {
      this.watchlistService.getMovies()
        .subscribe(movies => this.movies = movies);
    }
  }

}

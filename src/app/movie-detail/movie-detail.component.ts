import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { User } from '../user';
import { LoginService } from '../login.service';
import { Rating } from '../rating';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  user: User;
  rating: Rating;
  alreadyAdded: boolean;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
    private loginService: LoginService,
    private router: Router,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = this.loginService.getLoggedUser();
    this.getMovie();
    this.isInWatchlist();
    this.rating = { movieId: id } as Rating
    if (this.user) {
      this.rating.userId = this.user.id
    }
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  save(): void {
    let that = this;
    if (this.user) {
      this.movieService.addRating(this.rating)
        .subscribe(newRating => {
          that.ngOnInit();
        });
    }
  }

  addToWatchlist(): void {
    if (this.user && this.movie) {
      this.watchlistService.addToWatchlist(this.movie.id)
        .subscribe(_ => this.isInWatchlist());
    }
  }

  isInWatchlist(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (this.user) {
      this.watchlistService.isInWatchlist(movieId)
        .subscribe(res => {
          this.alreadyAdded = res == "true";
        });
    }
  }

  removeFromWatchlist(): void {
    if (this.user && this.movie) {
      this.watchlistService.deleteFromWatchlist(this.movie.id)
        .subscribe(_ =>this.isInWatchlist());
    }
  }
}
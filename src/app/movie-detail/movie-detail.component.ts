import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { User } from '../user';
import { LoginService } from '../login.service';
import { Rating } from '../rating';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  user: User;
  rating: Rating;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = this.loginService.loggedUser;
    this.getMovie();
    this.rating = { MovieID: id } as Rating
    if (this.user) {
      this.rating.UserID = this.user.ID
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
}
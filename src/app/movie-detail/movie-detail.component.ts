import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { User } from '../user';
import { LoginService } from '../login.service';
import { Circle } from '../circle';
import { CircleService } from '../circle.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  user: User;
  circle: Circle;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
    private loginService: LoginService,
    private circleService: CircleService
  ) { }

  ngOnInit() {
    this.user = this.loginService.loggedUser;
    this.circle = this.circleService.circle;
    console.log(this.circle)
    if (this.circle) {
      this.getMovieForCircle()
    } else {
      this.getMovie();
    }
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  getMovieForCircle(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.circleService.getMovieFromCircle(this.circle.ID, movieId)
      .subscribe(movie => this.movie = movie);
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Circle } from '../circle';
import { CircleService } from '../circle.service';
import { User } from '../user';
import { LoginService } from '../login.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-circle-detail',
  templateUrl: './circle-detail.component.html',
  styleUrls: ['./circle-detail.component.css']
})
export class CircleDetailComponent implements OnInit {
  circle: Circle;
  user: User;
  movies: Movie[];

  constructor(
    private route: ActivatedRoute,
    private circleService: CircleService,
    private location: Location,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getCircle();
    this.user = this.loginService.loggedUser;
    this.getMovies()
  }

  getMovies(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.circleService.getMoviesFromCircle(id)
      .subscribe(movies => this.movies = movies);
  }

  getCircle(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.circleService.getCircle(id)
      .subscribe(circle => this.circle = circle);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.circleService.updateCircle(this.circle)
      .subscribe(circle => this.circle = circle);
  }

}
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  movies: Movie[];
  me: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getMovies(): void {
    if (this.user) {
      this.userService.getMoviesForUser(this.user.id)
        .subscribe(movies => {
          this.movies = movies;
        });
    }
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == "me") {
      this.me = true;
      this.userService.getActualUser()
      .subscribe(user => {
        this.user = user;
        this.getMovies();
      });
    } else {
      this.me = false;
      this.userService.getUser(+id)
        .subscribe(user => {
          this.user = user;
          this.getMovies();
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(user => this.user = user);
  }

}
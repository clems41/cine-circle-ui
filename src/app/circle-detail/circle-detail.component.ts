import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Circle } from '../circle';
import { CircleService } from '../circle.service';
import { User } from '../user';
import { LoginService } from '../login.service';
import { Movie } from '../movie';
import { UserService } from '../user.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-circle-detail',
  templateUrl: './circle-detail.component.html',
  styleUrls: ['./circle-detail.component.css']
})
export class CircleDetailComponent implements OnInit {
  circle: Circle;
  user: User;
  movies: Movie[]; users$: Observable<User[]>;
  private searchTerms = new Subject<string>();

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  constructor(
    private route: ActivatedRoute,
    private circleService: CircleService,
    private location: Location,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCircle();
    this.user = this.loginService.loggedUser;
    this.getMovies()
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
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

  delete(user: User): void {
    this.circleService.removeUserFromCircle(this.circle, user)
      .subscribe(circle => {
        this.circle = circle;
        this.ngOnInit();
      })
  }

  add(user: User): void {
    this.circleService.addUserToCircle(this.circle, user)
      .subscribe(circle => {
        this.circle = circle;
        this.ngOnInit();
      })
  }
}
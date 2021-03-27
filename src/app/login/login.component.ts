import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private loginService: LoginService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  logUser(username: string, password: string) {
    this.loginService.signIn(username, password)
      .subscribe(res => this.router.navigate([`/user/me`]));
  }

}

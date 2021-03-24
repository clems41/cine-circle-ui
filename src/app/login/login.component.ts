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
  user: User;
  username: string;

  constructor(private userService: UserService, 
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
  }

  logUser(username: string, password: string) {
    let that = this;
    this.userService.searchUsers(username)
      .subscribe(users => {
        if (users.length >= 1) {
          users.forEach(function (user) {
            if (user.Username == username) {
              that.loginService.loggedUsername = username;
              that.router.navigate([`/user/${user.ID}`]);
            }
          });
        }
      });
  }

}

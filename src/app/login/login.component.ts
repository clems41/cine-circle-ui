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
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
    if(this.loginService.getLoggedUser()) {
      this.router.navigate([`/user/me`]);
    }
  }

  logUser(username: string, password: string) {
    this.loginService.signIn(username, password)
      .subscribe(res => {
        if (res) {
          this.router.navigate([`/user/me`]);
        }
    });
  }

}

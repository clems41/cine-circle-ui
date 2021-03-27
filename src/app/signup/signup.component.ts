import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../user';
import { UserService } from '../user.service';

const MaxNumberOfUsersToDisplay = 10;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users: User[] = [];
  user: User;

  constructor(private loginService: LoginService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  signup(username: string, fullname: string, email:string, password: string): void {
    const user = {username: username, fullName: fullname, email: email, password: password} as User;
    this.loginService.signUp(user)
    .subscribe(user => {
      this.user = user;
      this.loginService.signIn(user.username, password).subscribe(
        res => this.router.navigate([`/user/me`])
        );
    });
  }
}

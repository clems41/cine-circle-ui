import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user';
import { UserService } from '../user.service'

const MaxNumberOfUsersToDisplay = 10;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  user: User;

  constructor(private userService: UserService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.getUsers();
    this.user = this.loginService.getLoggedUser();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users.slice(0, MaxNumberOfUsersToDisplay));
  }

  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }
}

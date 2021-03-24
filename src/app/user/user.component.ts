import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  add(username: string, fullname: string, email: string): void {
    username = username.trim();
    if (!username) { return; }
    this.userService.addUser({Username: username, FullName: fullname, Email: email } as User)
      .subscribe(user => {
        if (user) {
          this.users.push(user);
        }
      });
  }

  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }
}

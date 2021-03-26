import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedUser: User;

  constructor(private messageService: MessageService) { }

  getHttpOptionsForAuthentication(): HttpHeaders {
    if (this.loggedUser) {
      this.log(`getHttpOptionsForAuthentication username = ${this.loggedUser.Username}`)
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'username': this.loggedUser.Username,
      })
    } else {
      this.log(`getHttpOptionsForAuthentication user not logged yet`)
      return new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`LoginService: ${message}`);
    }
}

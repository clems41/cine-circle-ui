import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private signInUrl = '/api/v1/signin';
  private signUpUrl = '/api/v1/signup';
  private usersUrl = '/api/v1/users';

  token: string;
  user: User;

  constructor(private messageService: MessageService,
    private http: HttpClient) { }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getLoggedUser(): User {
    return this.user;
  }

  getHttpOptionsForAuthentication(): HttpHeaders {
    if (this.token) {
      this.log(`getHttpOptionsForAuthentication with token`);
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      });
    } else {
      this.log(`getHttpOptionsForAuthentication user not logged yet`)
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }

  signIn(username: string, password: string): Observable<string> {
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
    this.token = null;
    return this.http.post<string>(this.signInUrl, null,
      { headers: new HttpHeaders({ 'Authorization': basicAuth }) }).pipe(
        tap((token: string) => {
          this.log(`getting token for user=${username} and token=${token}`);
          this.token = token;
        }),
        catchError(this.handleError<string>('signIn'))
      );
  }

  /** POST: add a new user to the server */
  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.signUpUrl, user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`LoginService: ${message}`);
  }
}

import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { LoginService } from './login.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private usersUrl = '/api/v1/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loginService: LoginService) { }

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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl,
      { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getActualUser(): Observable<User> {
    return this.http.get<User>(this.usersUrl + `/me`,
    { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log(`fetched user me`)),
        catchError(this.handleError<User>('getActualUser', null))
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + `/${id}`,
    { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log(`fetched user id ${id}`)),
        catchError(this.handleError<User>('getUser', null))
      );
  }

  getMoviesForUser(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.usersUrl + `/${id}/movies`,
    { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log(`fetched movies for user id ${id}`)),
        catchError(this.handleError<Movie[]>('getMoviesForUser'))
      );
  }

  userExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(this.usersUrl + `/${username}/exists`)
      .pipe(
        tap(_ => this.log(`check if user exists ${username} exists`)),
        catchError(this.handleError<boolean>('getUser', null))
      );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user,
      { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap((newUser: User) => this.log(`updated user id=${newUser.id}`)),
        catchError(this.handleError<any>('updateUser'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete<User>(url,
      { headers: this.loginService.getHttpOptionsForAuthentication() }).pipe(
        tap(_ => this.log(`deleted user id=${user.id}`)),
        catchError(this.handleError<User>('deleteUser'))
      );
  }

  /* GET heroes whose name contains search term */
  searchUsers(usernameTerm: string): Observable<User[]> {
    if (!usernameTerm.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?username=${usernameTerm}`,
    { headers: this.loginService.getHttpOptionsForAuthentication() }).pipe(
      tap(x => x.length ?
        this.log(`found users matching "${usernameTerm}"`) :
        this.log(`no users matching "${usernameTerm}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}

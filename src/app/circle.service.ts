import { Injectable } from '@angular/core';
import { Circle } from './circle';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { LoginService } from './login.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Movie } from './movie';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CircleService {
  circle: Circle;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private circlesUrl = '/api/v1/circles';

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

      // TODO: better job of transforming error for circle consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCircles(): Observable<Circle[]> {
    return this.http.get<Circle[]>(this.circlesUrl, 
      { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log('fetched circles')),
        catchError(this.handleError<Circle[]>('getCircles', []))
      );
  }

  getCircle(id: number): Observable<Circle> {
    return this.http.get<Circle>(this.circlesUrl + `/${id}`, 
    { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap((circle: Circle) => { 
          this.log(`fetched circle id ${id}`);
          this.circle = circle}),
        catchError(this.handleError<Circle>('getCircle', null))
      );
  }

  updateCircle(circle: Circle): Observable<Circle> {
    return this.http.put<Circle>(`${this.circlesUrl}/${circle.id}`, circle,
      { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap((newCircle: Circle) => this.log(`updated circle id=${newCircle.id}`)),
        catchError(this.handleError<any>('updateCircle'))
      );
  }

  /** POST: add a new hero to the server */
  addCircle(circle: Circle): Observable<Circle> {
    return this.http.post<Circle>(this.circlesUrl, circle,
      { headers: this.loginService.getHttpOptionsForAuthentication() }).pipe(
        tap((newCircle: Circle) => this.log(`added circle id=${newCircle.id}`)),
        catchError(this.handleError<Circle>('addCircle'))
      );
  }

  addUserToCircle(circle: Circle, user: User): Observable<Circle> {
    return this.http.put<Circle>(`${this.circlesUrl}/${circle.id}/${user.id}`, null,
      { headers: this.loginService.getHttpOptionsForAuthentication() }).pipe(
        tap((newCircle: Circle) => this.log(`adduserToCircle  id=${newCircle.id} user ${user.username}`)),
        catchError(this.handleError<Circle>('adduserToCircle'))
      );
  }

  removeUserFromCircle(circle: Circle, user: User): Observable<Circle> {
    return this.http.delete<Circle>(`${this.circlesUrl}/${circle.id}/${user.id}`,
      { headers: this.loginService.getHttpOptionsForAuthentication() }).pipe(
        tap((newCircle: Circle) => this.log(`removeUserFromCircle  id=${newCircle.id} user ${user.username}`)),
        catchError(this.handleError<Circle>('removeUserFromCircle'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteCircle(circle: Circle): Observable<Circle> {
    const url = `${this.circlesUrl}/${circle.id}`;

    return this.http.delete<Circle>(url,
      { headers: this.loginService.getHttpOptionsForAuthentication() }).pipe(
        tap(_ => this.log(`deleted circle id=${circle.id}`)),
        catchError(this.handleError<Circle>('deleteCircle'))
      );
  }

  /* GET heroes whose name contains search term */
  searchCircles(circlenameTerm: string): Observable<Circle[]> {
    if (!circlenameTerm.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Circle[]>(`${this.circlesUrl}/?circlename=${circlenameTerm}`,
    { headers: this.loginService.getHttpOptionsForAuthentication() }).pipe(
      tap(x => x.length ?
        this.log(`found circles matching "${circlenameTerm}"`) :
        this.log(`no circles matching "${circlenameTerm}"`)),
      catchError(this.handleError<Circle[]>('searchCircles', []))
    );
  }

  /* GET heroes whose name contains search term */
  getMoviesFromCircle(circleId: number): Observable<Movie[]> {
    const search = "sort=date:desc";
    return this.http.get<Movie[]>(`${this.circlesUrl}/${circleId}/movies?${search}`,
    { headers: this.loginService.getHttpOptionsForAuthentication() }).pipe(
      tap(x => x.length ?
        this.log(`found movies for circle "${circleId}"`) :
        this.log(`no movies matching "${circleId}"`)),
      catchError(this.handleError<Movie[]>('getMoviesFromCircle', []))
    );
  }

  /* GET heroes whose name contains search term */
  getMovieFromCircle(circleId: number, movieId: string): Observable<Movie> {
    const search = "sort=date:desc";
    return this.http.get<Movie>(`${this.circlesUrl}/${circleId}/movie/${movieId}`,
    { headers: this.loginService.getHttpOptionsForAuthentication() }).pipe(
      tap(_ => this.log(`get movie ${movieId} for circle id=${circleId}`)),
      catchError(this.handleError<Movie>('getMovieFromCircle'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CircleService: ${message}`);
  }
}

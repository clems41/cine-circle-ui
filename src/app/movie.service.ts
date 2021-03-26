import { Injectable } from '@angular/core';
import { Movie, MovieSearch } from './movie';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Rating } from './rating';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private moviesUrl = '/api/v1/movies';
  private ratingsUrl = '/api/v1/ratings';

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

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(this.moviesUrl + `/${id}`,
      { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log(`fetched movie id ${id}`)),
        catchError(this.handleError<Movie>('getMovie'))
      );
  }

  addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.ratingsUrl + `/${rating.MovieID}`, rating,
      { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log(`add rating to movie id ${rating.MovieID}`)),
        catchError(this.handleError<Rating>('addRating'))
      );

  }

  /* GET movires whose name contains search term */
  searchMovies(titleTerm: string, mediaType: string): Observable<MovieSearch> {
    if (!titleTerm.trim()) {
      // if not search term, return empty hero array.
      return of(null);
    }
    return this.http.get<MovieSearch>(`${this.moviesUrl}/?title=${titleTerm}&type=${mediaType}`,
      { headers: this.loginService.getHttpOptionsForAuthentication()})
      .pipe(
        tap(x => x.Search.length ?
          this.log(`found media matching "${titleTerm}"`) :
          this.log(`no media matching "${titleTerm}"`)),
        catchError(this.handleError<MovieSearch>('searchMovies'))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}

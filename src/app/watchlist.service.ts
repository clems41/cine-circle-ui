import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { MessageService } from './message.service';
import { MovieSearch } from './movie';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistUrl = '/api/v1/watchlist';

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private messageService: MessageService) { }


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

  getMovies(): Observable<MovieSearch> {
    return this.http.get<MovieSearch>(this.watchlistUrl,
    { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log(`fetched movies from watchlist`)),
        catchError(this.handleError<MovieSearch>('getMovies'))
      );
  }

  addToWatchlist(movieId: string): Observable<any> {
    return this.http.post<any>(`${this.watchlistUrl}/${movieId}`, null,
    { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log(`adding movie ${movieId} to watchlist`)),
        catchError(this.handleError<any>('addToWatchlist'))
      );
  }

  deleteFromWatchlist(movieId: string): Observable<any> {
    return this.http.delete<any>(`${this.watchlistUrl}/${movieId}`,
    { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log(`deleting movie ${movieId} from watchlist`)),
        catchError(this.handleError<any>('deleteFromWatchlist'))
      );
  }

  isInWatchlist(movieId: string): Observable<string> {
    return this.http.get<string>(`${this.watchlistUrl}/${movieId}`,
    { headers: this.loginService.getHttpOptionsForAuthentication() })
      .pipe(
        tap(_ => this.log(`know if movie ${movieId} is in watchlist`)),
        catchError(this.handleError<string>('isInWatchlist'))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MessageService: ${message}`);
  }
}

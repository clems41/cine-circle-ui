import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {SignInForm, SignInView, SignupForm} from '../models/auth';
import {User} from '../models/user';

const userInfoLocalStorageKey = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userApi: string;

  constructor(private http: HttpClient,
              @Inject('API_URL')
              private apiUrl: string) {
    this.userApi = apiUrl + '/users';
  }

  get token(): string {
    let userInfo = localStorage.getItem(userInfoLocalStorageKey) || '';
    if (userInfo != '') {
      let user: SignInView = JSON.parse(userInfo);
      return user.token.tokenStr;
    } else {
      return '';
    }
  }

  signIn(form: SignInForm): Observable<SignInView> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(`${form.login}:${form.password}`));
    return this.http.post<SignInView>(`${this.userApi}/sign-in`, {}, {
      'headers': headers,
    }).pipe(
      tap(
        view => {
          localStorage.setItem(userInfoLocalStorageKey, JSON.stringify(view));
        }
      )
    );
  }

  signUp(form: SignupForm): Observable<User> {
    return this.http.post<User>(`${this.userApi}/sign-up`, form);
  }

  signOut(): void {
    localStorage.removeItem(userInfoLocalStorageKey);
  }

  isLoggedIn(): boolean {
    return this.token != '';
  }

}

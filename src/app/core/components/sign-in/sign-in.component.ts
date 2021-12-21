import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {SignInForm, SignInView} from '../../../models/auth';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  login: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  signIn() {
    this.errorMessage = '';
    const form: SignInForm = {
      'login': this.login,
      'password': this.password,
    };
    this.authService.signIn(form).subscribe({
        next: (view: SignInView) => {
          console.log('successfully logged ', view);
          this.router.navigate(['/home']).then();
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
        }
      }
    );
  }

}

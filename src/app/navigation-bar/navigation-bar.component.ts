import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signout(): void {
    this.loginService.signOut();
    this.router.navigate(['/signin']);
  }

}

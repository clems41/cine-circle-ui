import { Component, OnInit } from '@angular/core';
import { Circle } from '../circle';
import { CircleService } from '../circle.service'
import { LoginService } from '../login.service';
import { User } from '../user';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})

export class CircleComponent implements OnInit {
  circles: Circle[] = [];
  user: User;

  constructor(private circleService: CircleService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getCircles();
    this.user = this.loginService.getLoggedUser();
  }

  getCircles(): void {
    this.circleService.getCircles()
    .subscribe(circles => this.circles = circles);
  }

  add(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    if (!name || !description) { return; }
    this.circleService.addCircle({name: name, description: description} as Circle)
      .subscribe(circle => {
        if (circle) {
          this.circles.push(circle);
        }
      });
  }

  delete(circle: Circle): void {
    this.circles = this.circles.filter(c => c !== circle);
    this.circleService.deleteCircle(circle).subscribe();
  }
}

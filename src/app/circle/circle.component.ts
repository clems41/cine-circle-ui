import { Component, OnInit } from '@angular/core';
import { Circle } from '../circle';
import { CircleService } from '../circle.service'

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})

export class CircleComponent implements OnInit {
  circles: Circle[] = [];

  constructor(private circleService: CircleService) { }

  ngOnInit(): void {
    this.getCircles();
  }

  getCircles(): void {
    this.circleService.getCircles()
    .subscribe(circles => this.circles = circles);
  }

  add(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    if (!name || !description) { return; }
    this.circleService.addCircle({Name: name, Description: description} as Circle)
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

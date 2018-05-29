import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, Atnd } from '../atnd';
import { AtndMgtService } from '../atnd-mgt.service';

@Component({
  selector: 'app-atnd-mgt-student',
  templateUrl: './atnd-mgt-student.component.html',
  styleUrls: ['./atnd-mgt-student.component.scss']
})
export class AtndMgtStudentComponent implements OnInit {
  // userId: number;
  date = new Date();
  user = new User();
  // atnds: Atnd[];
  atndCodes = ['出席', '遅刻', '欠席', '就活', '病欠', '公欠'];

  constructor(private route: ActivatedRoute, private atndMgtService: AtndMgtService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.user.id = res['student'];
      this.date.setFullYear(res['year']);
      this.date.setMonth(res['month']);
    });
    this.getAtnds();
  }

  getAtnds(): void {
    this.atndMgtService.getAtndsOneMonth(this.date.getFullYear(), this.date.getMonth() + 1, this.user.id)
    .subscribe(user => this.user = user);
  }

  lastMonth(): void {
    this.date.setMonth(this.date.getMonth() - 1);
    this.date = new Date(this.date.getTime());
    this.getAtnds();
  }

  nextMonth(): void {
    this.date.setMonth(this.date.getMonth() + 1);
    this.date = new Date(this.date.getTime());
    this.getAtnds();
  }

}

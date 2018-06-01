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
  date = new Date();
  user = new User();
  atndCodes = ['出席', '遅刻', '欠席', '就活', '病欠', '公欠', '記録なし'];

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

  isAbsent(state: number): boolean {
    if ( state === 1 || state === 2 || state === 4) {
      return true;
    } else {
      return false;
    }
  }

  isUnknown(state: number): boolean {
    if ( state === 6 ) {
      return true;
    } else {
      return false;
    }
  }

  changeState(atndId: number, state: {[key: string]: number; }) {
    this.atndMgtService.putAtnd(this.user.id, this.user.atnds[atndId].date, state).subscribe(times => {
      this.user.atnds[atndId].cameAt = times.cameAt;
      this.user.atnds[atndId].leavedAt = times.leavedAt;
    });
  }
}

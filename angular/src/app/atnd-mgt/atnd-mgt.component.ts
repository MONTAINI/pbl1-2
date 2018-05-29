import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Atnd, User, MgtInfo } from '../atnd';
import { AtndMgtService } from '../atnd-mgt.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-atnd-mgt',
  templateUrl: './atnd-mgt.component.html',
  styleUrls: ['./atnd-mgt.component.scss']
})
export class AtndMgtComponent implements OnInit {
  date = new Date();
  users:  User[];
  atnds:  Atnd[];
  // days: string[]; テンプレート内でdaysがnullになる
  days = [''];
  offset = 0;

  constructor(private dialog: MatDialog, private atndMgtService: AtndMgtService) { }

  ngOnInit() {
    this.getAtnds('init');
  }

  getAtnds(method: string): void {
    this.atndMgtService.getAtndsAllStudents(this.date.getFullYear(), this.date.getMonth() + 1, this.offset).subscribe(mgtInfo => {
      this.days = mgtInfo.dates;
      this.users = mgtInfo.users;
      for ( const user of this.users ) {
        user.atnds = mgtInfo.atnds.filter(atnd => atnd.userId === user.id);
      }
      // tslint:disable-next-line:forin
      for ( const userIdx in this.users ) { // 登校日なのにデータがない日付に空のAtndインスタンスを挿入する
        for ( const atndIdx in this.users[userIdx].atnds ) {
           if ( this.days[atndIdx] !== this.users[userIdx].atnds[atndIdx].date ) {
             this.users[userIdx].atnds.splice(Number(atndIdx), 0, new Atnd());
           }
        }
      }
      switch (method) {
        case 'next':
          this.offset = 0;
          break;
        case 'previous':
          this.offset = Math.floor((this.days.length - 1) / 5) * 5;
          break;
      }
    });
  }

  // 前のデータ
  previous(): void {
    if ( this.offset <= 0 ) { // 先月
      this.date.setMonth(this.date.getMonth() - 1);
      this.date = new Date(this.date.getTime());
      this.getAtnds('previous');
    } else {
      this.offset -= 5;
    }

  }

  // 次のデータ
  next(): void {
    if ( this.offset + 5 > this.days.length ) { //  来月
      this.date.setMonth(this.date.getMonth() + 1);
      this.date = new Date(this.date.getTime());
      this.getAtnds('next');
    } else {
      this.offset += 5;
    }
  }

  openDialog(atnd: Atnd): void {
    this.dialog.open(DialogComponent, {
      data: {
        atnd: atnd
      }
    });
  }
}

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
  // days: string[]; にするとテンプレート内でdaysがnullになる
  days = [''];
  offset = 0;

  constructor(private dialog: MatDialog, private atndMgtService: AtndMgtService) { }

  ngOnInit() {
    this.getAtnds('init');
  }

  getAtnds(method: string): void {
    this.atndMgtService.getAtndsAllStudents(this.date.getFullYear(), this.date.getMonth() + 1).subscribe(mgtInfo => {
      this.days = mgtInfo.dates;
      this.users = mgtInfo.users;
      for ( const user of this.users ) { // userの中に出席状況を入れる
        user.atnds = mgtInfo.atnds.filter(atnd => atnd.userId === user.id);
      }
      const dummyAtnd = new Atnd();
      [dummyAtnd.atnd1, dummyAtnd.atnd2, dummyAtnd.atnd3, dummyAtnd.atnd4, dummyAtnd.atnd5] = [6, 6, 6, 6, 6];
      // tslint:disable-next-line:forin
      // for ( const userIdx in this.users ) { // 登校日なのにデータがない日付に空のAtndインスタンスを挿入する
      //   for ( const atndIdx in this.users[userIdx].atnds ) {
      //      if ( this.days[atndIdx] !== this.users[userIdx].atnds[atndIdx].date ) {
      //        dummyAtnd.userId = this.users[userIdx].id;
      //        dummyAtnd.date = this.days[atndIdx];
      //        this.users[userIdx].atnds.splice(Number(atndIdx), 0, dummyAtnd);
      //      }
      //   }
      // }
      this.users.forEach((user, usersIdx, users) => {
        for ( const atndIdx in user.atnds ) {
          if ( this.days[atndIdx] !== user.atnds[atndIdx].date ) {
             dummyAtnd.userId = user.id;
             dummyAtnd.date = this.days[atndIdx];
             user.atnds.splice(Number(atndIdx), 0, dummyAtnd);
          }
        }
      });
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

  isAbsent(atnd: Atnd): boolean {
    const atndArray = [];
    [atndArray[0], atndArray[1], atndArray[2], atndArray[3], atndArray[4]] =
      [atnd.atnd1, atnd.atnd2, atnd.atnd3, atnd.atnd4, atnd.atnd5];

    return atndArray.some(state => state === 1 || state === 2 || state === 4);
  }

  isUnknown(atnd: Atnd): boolean {
    const atndArray = [];
    [atndArray[0], atndArray[1], atndArray[2], atndArray[3], atndArray[4]] =
      [atnd.atnd1, atnd.atnd2, atnd.atnd3, atnd.atnd4, atnd.atnd5];
    return atndArray.some(state => state === 6);
  }

  openDialog(atnd: Atnd): void {
    this.dialog.open(DialogComponent, {
      data: {
        atnd: atnd
      }
    });
  }
}

import { Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import { Atnd } from '../atnd';
import { AtndMgtService } from '../atnd-mgt.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  atndCodes = ['出席', '遅刻', '欠席', '就活', '病欠', '公欠', '記録なし'];

  atnd: number[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private atndMgtService: AtndMgtService) { }

  changeState(state: {[key: string]: number; }) {
    this.atndMgtService.putAtnd(this.data.atnd.userId, this.data.atnd.date, state).subscribe(times => {
      this.data.atnd.cameAt = times.cameAt;
      this.data.atnd.leavedAt = times.leavedAt;
    });
    /*
    const startAts = [new Date('2000/01/01 09:20:00'),
                      new Date('2000/01/01 10:20:00'),
                      new Date('2000/01/01 11:20:00'),
                      new Date('2000/01/01 13:00:00'),
                      new Date('2000/01/01 14:00:00')];
    const states = [this.data.atnd.atnd1,
                    this.data.atnd.atnd2,
                    this.data.atnd.atnd3,
                    this.data.atnd.atnd4,
                    this.data.atnd.atnd5];

    // 登校時刻の更新
    for (const idx in states) {
      if ( states[idx] === 0 ) {
        this.data.atnd.cameAt = this.timeToStr(startAts[idx]);
        break;
      } else if ( states[idx] === 1 ) {
        this.data.atnd.cameAt = this.timeToStr(startAts[idx], 15);
        break;
      }
    }

    // 下校時刻の更新
    for (const idx in states) {
      if ( states.reverse()[idx] === 0 || states.reverse()[idx] === 1 ) {
        console.log(idx, startAts.reverse()[idx]);
        this.data.atnd.leavedAt = this.timeToStr(startAts.reverse()[idx], 50);
        break;
      }
    }
    */
  }
  /*
  timeToStr(time: Date, minutes: number = 0): string {
    time.setMinutes(time.getMinutes() + minutes);
    return ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2) + ':' + ('0' + time.getSeconds()).slice(-2);
  }
  */

}

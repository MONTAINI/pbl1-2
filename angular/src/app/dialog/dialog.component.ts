import { Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import { Atnd } from '../atnd';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  atndCodes = ['出席', '遅刻', '欠席', '就活', '病欠', '公欠'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

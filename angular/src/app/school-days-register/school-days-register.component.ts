import { Component, OnInit } from '@angular/core';

import { AtndMgtService } from '../atnd-mgt.service';

@Component({
  selector: 'app-school-days-register',
  templateUrl: './school-days-register.component.html',
  styleUrls: ['./school-days-register.component.scss']
})
export class SchoolDaysRegisterComponent implements OnInit {

  constructor(private atndMgtService: AtndMgtService) { }
  periodSchoolDay: Date[] = new Array(4);
  minDate = new Date(2000, 3, 1);
  maxDate = new Date(2001, 2, 31);
  selectedFiscalYear: number;
  fiscalYears: number[] = new Array(2);

  ngOnInit() {
    const now = new Date();
    this.fiscalYears[0] = (now.getMonth() > 4 ? now.getFullYear() : now.getFullYear() - 1);
    this.fiscalYears[1] = this.fiscalYears[0] + 1;
    this.minDate.setFullYear(this.fiscalYears[0]);
    this.maxDate.setFullYear(this.fiscalYears[1]);
  }

  changeSelectedFiscalYear(): void {
    this.minDate.setFullYear(this.selectedFiscalYear);
    this.maxDate.setFullYear(this.selectedFiscalYear + 1);
  }

  send(): void {
    this.atndMgtService.postSchoolDays(
        {"fiscalYear": this.selectedFiscalYear.toString(),
        "firstTermStartDate": this.formatDate(this.periodSchoolDay[0]),
        "firstTermLastDate": this.formatDate(this.periodSchoolDay[1]),
        "latterTermStartDate": this.formatDate(this.periodSchoolDay[2]),
        "latterTermLastDate": this.formatDate(this.periodSchoolDay[3])}
    ).subscribe();
  }

  formatDate(date: Date): string {
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  }
}

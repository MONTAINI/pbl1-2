import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtndMgtComponent } from './atnd-mgt/atnd-mgt.component';
import { AtndMgtStudentComponent } from './atnd-mgt-student/atnd-mgt-student.component';
import { YearRegisterComponent } from './year-register/year-register.component';

const routes: Routes = [
  { path: 'atnd-mgt', component: AtndMgtComponent },
  { path: 'atnd-mgt-student/month/:year/:month/student/:student', component: AtndMgtStudentComponent },
  { path: 'year-register', component: YearRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

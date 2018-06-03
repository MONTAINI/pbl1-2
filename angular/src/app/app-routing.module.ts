import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtndMgtComponent } from './atnd-mgt/atnd-mgt.component';
import { AtndMgtStudentComponent } from './atnd-mgt-student/atnd-mgt-student.component';
import { SchoolDaysRegisterComponent } from './school-days-register/school-days-register.component';

const routes: Routes = [
  { path: 'atnd-mgt', component: AtndMgtComponent },
  { path: 'atnd-mgt-student/month/:year/:month/student/:student', component: AtndMgtStudentComponent },
  { path: 'school-days-register', component: SchoolDaysRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatProgressBarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSelectModule,
  MatDividerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtndMgtComponent } from './atnd-mgt/atnd-mgt.component';
import { AtndMgtService } from './atnd-mgt.service';
import { AtndMgtStudentComponent } from './atnd-mgt-student/atnd-mgt-student.component';
import { DialogComponent } from './dialog/dialog.component';
import { SchoolDaysRegisterComponent } from './school-days-register/school-days-register.component';

@NgModule({
  declarations: [
    AppComponent,
    AtndMgtComponent,
    AtndMgtStudentComponent,
    DialogComponent,
    SchoolDaysRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule
  ],
  entryComponents: [DialogComponent],
  providers: [AtndMgtService],
  bootstrap: [AppComponent]
})
export class AppModule { }

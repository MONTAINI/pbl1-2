import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDaysRegisterComponent } from './school-days-register.component';

describe('SchoolDaysRegisterComponent', () => {
  let component: SchoolDaysRegisterComponent;
  let fixture: ComponentFixture<SchoolDaysRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDaysRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDaysRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

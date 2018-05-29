import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearRegisterComponent } from './year-register.component';

describe('YearRegisterComponent', () => {
  let component: YearRegisterComponent;
  let fixture: ComponentFixture<YearRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

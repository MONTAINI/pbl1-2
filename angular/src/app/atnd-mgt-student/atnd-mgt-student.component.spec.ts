import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtndMgtStudentComponent } from './atnd-mgt-student.component';

describe('AtndMgtStudentComponent', () => {
  let component: AtndMgtStudentComponent;
  let fixture: ComponentFixture<AtndMgtStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtndMgtStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtndMgtStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

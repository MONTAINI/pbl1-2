import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtndMgtDayComponent } from './atnd-mgt-day.component';

describe('AtndMgtDayComponent', () => {
  let component: AtndMgtDayComponent;
  let fixture: ComponentFixture<AtndMgtDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtndMgtDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtndMgtDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

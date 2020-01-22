import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DzCalendarComponent } from './dz-calendar.component';

describe('DzCalendarComponent', () => {
  let component: DzCalendarComponent;
  let fixture: ComponentFixture<DzCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DzCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DzCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

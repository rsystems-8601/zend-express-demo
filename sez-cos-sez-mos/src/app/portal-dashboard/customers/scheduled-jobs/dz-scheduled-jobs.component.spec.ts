import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DzScheduledJobsComponent } from './dz-scheduled-jobs.component';

describe('DzScheduledJobsComponent', () => {
  let component: DzScheduledJobsComponent;
  let fixture: ComponentFixture<DzScheduledJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DzScheduledJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DzScheduledJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

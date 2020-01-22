import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DzAnnouncementsComponent } from './dz-announcements.component';

describe('DzAnnouncementsComponent', () => {
  let component: DzAnnouncementsComponent;
  let fixture: ComponentFixture<DzAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DzAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DzAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

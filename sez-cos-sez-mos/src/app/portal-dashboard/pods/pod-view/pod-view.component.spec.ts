import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodViewComponent } from './pod-view.component';

describe('PodViewComponent', () => {
  let component: PodViewComponent;
  let fixture: ComponentFixture<PodViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

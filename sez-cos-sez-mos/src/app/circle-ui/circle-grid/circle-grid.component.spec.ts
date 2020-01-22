import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleGridComponent } from './circle-grid.component';

describe('CircleGridComponent', () => {
  let component: CircleGridComponent;
  let fixture: ComponentFixture<CircleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

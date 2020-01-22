import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleCellComponent } from './circle-cell.component';

describe('CircleCellComponent', () => {
  let component: CircleCellComponent;
  let fixture: ComponentFixture<CircleCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

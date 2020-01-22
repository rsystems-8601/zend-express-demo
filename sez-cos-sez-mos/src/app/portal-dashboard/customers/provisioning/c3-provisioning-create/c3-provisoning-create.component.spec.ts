import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C3ProvisoningCreateComponent } from './c3-provisoning-create.component';

describe('C3ProvisoningCreateComponent', () => {
  let component: C3ProvisoningCreateComponent;
  let fixture: ComponentFixture<C3ProvisoningCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C3ProvisoningCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C3ProvisoningCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

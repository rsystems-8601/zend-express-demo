import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2NewOrderComponent } from './step2-new-order.component';

describe('Step2NewOrderComponent', () => {
  let component: Step2NewOrderComponent;
  let fixture: ComponentFixture<Step2NewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2NewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2NewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

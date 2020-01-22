import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1CustomerInfoComponent } from './step1-customer-info.component';

describe('Step1CustomerInfoComponent', () => {
  let component: Step1CustomerInfoComponent;
  let fixture: ComponentFixture<Step1CustomerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step1CustomerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1CustomerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

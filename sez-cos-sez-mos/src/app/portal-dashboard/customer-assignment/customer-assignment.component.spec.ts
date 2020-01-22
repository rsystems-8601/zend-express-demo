import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAssignmentComponent } from './customer-assignment.component';

describe('CustomerAssignmentComponent', () => {
  let component: CustomerAssignmentComponent;
  let fixture: ComponentFixture<CustomerAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

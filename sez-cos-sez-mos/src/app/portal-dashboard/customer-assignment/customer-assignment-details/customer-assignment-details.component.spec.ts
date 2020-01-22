import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAssignmentDetailsComponent } from './customer-assignment-details.component';

describe('CustomerAssignmentDetailsComponent', () => {
  let component: CustomerAssignmentDetailsComponent;
  let fixture: ComponentFixture<CustomerAssignmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAssignmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAssignmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

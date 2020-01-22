import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C3ProvisioningListComponent } from './c3-provisioning-list.component';

describe('C3ProvisioningListComponent', () => {
  let component: C3ProvisioningListComponent;
  let fixture: ComponentFixture<C3ProvisioningListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C3ProvisioningListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C3ProvisioningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

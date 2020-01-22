import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C3ProvisioningViewComponent } from './c3-provisioning-view.component';

describe('C3ProvisioningViewComponent', () => {
  let component: C3ProvisioningViewComponent;
  let fixture: ComponentFixture<C3ProvisioningViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C3ProvisioningViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C3ProvisioningViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

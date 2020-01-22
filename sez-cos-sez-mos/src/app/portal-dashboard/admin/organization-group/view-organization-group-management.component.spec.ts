import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganizationGroupManagementComponent } from './view-organization-group-management.component';

describe('ViewOrganizationGroupManagementComponent', () => {
  let component: ViewOrganizationGroupManagementComponent;
  let fixture: ComponentFixture<ViewOrganizationGroupManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrganizationGroupManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrganizationGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

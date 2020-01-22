import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacenterProvisionComponent } from './datacenter-provision.component';

describe('DatacenterProvisionComponent', () => {
  let component: DatacenterProvisionComponent;
  let fixture: ComponentFixture<DatacenterProvisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacenterProvisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacenterProvisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

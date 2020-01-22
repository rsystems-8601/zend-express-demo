import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacenterListComponent } from './datacenter-list.component';

describe('DatacenterListComponent', () => {
  let component: DatacenterListComponent;
  let fixture: ComponentFixture<DatacenterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacenterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

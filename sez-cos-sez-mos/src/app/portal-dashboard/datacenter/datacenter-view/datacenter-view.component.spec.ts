import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacenterViewComponent } from './datacenter-view.component';

describe('DatacenterViewComponent', () => {
  let component: DatacenterViewComponent;
  let fixture: ComponentFixture<DatacenterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacenterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacenterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

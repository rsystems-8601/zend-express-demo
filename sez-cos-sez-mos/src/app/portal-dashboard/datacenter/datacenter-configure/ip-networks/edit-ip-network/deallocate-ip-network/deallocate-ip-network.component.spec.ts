import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeallocateIpNetworkComponent } from './deallocate-ip-network.component';

describe('DeallocateIpNetworkComponent', () => {
  let component: DeallocateIpNetworkComponent;
  let fixture: ComponentFixture<DeallocateIpNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeallocateIpNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeallocateIpNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

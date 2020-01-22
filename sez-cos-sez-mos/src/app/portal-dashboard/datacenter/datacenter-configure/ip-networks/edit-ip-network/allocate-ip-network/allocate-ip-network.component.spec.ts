import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateIpNetworkComponent } from './allocate-ip-network.component';

describe('AllocateIpNetworkComponent', () => {
  let component: AllocateIpNetworkComponent;
  let fixture: ComponentFixture<AllocateIpNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateIpNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateIpNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

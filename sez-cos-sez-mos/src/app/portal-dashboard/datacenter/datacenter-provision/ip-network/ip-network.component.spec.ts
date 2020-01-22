import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpNetworkComponent } from './ip-network.component';

describe('IpNetworkComponent', () => {
  let component: IpNetworkComponent;
  let fixture: ComponentFixture<IpNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

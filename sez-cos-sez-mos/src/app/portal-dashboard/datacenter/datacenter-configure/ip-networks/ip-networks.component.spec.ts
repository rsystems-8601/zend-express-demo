import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpNetworksComponent } from './ip-networks.component';

describe('IpNetworksComponent', () => {
  let component: IpNetworksComponent;
  let fixture: ComponentFixture<IpNetworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpNetworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

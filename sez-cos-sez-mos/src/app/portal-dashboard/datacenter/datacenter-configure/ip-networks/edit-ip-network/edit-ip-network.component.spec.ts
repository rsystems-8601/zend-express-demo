import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIpNetworkComponent } from './edit-ip-network.component';

describe('EditIpNetworkComponent', () => {
  let component: EditIpNetworkComponent;
  let fixture: ComponentFixture<EditIpNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIpNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIpNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

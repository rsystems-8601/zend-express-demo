import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIpNetworkComponent } from './delete-ip-network.component';

describe('DeleteIpNetworkComponent', () => {
  let component: DeleteIpNetworkComponent;
  let fixture: ComponentFixture<DeleteIpNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteIpNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIpNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

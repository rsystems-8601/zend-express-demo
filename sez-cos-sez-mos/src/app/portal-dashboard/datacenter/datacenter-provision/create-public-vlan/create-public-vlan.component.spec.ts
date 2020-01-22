import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicVlanComponent } from './create-public-vlan.component';

describe('CreatePublicVlanComponent', () => {
  let component: CreatePublicVlanComponent;
  let fixture: ComponentFixture<CreatePublicVlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePublicVlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePublicVlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

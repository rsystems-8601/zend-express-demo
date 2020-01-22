import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionTabsComponent } from './provision-tabs.component';

describe('ProvisionTabsComponent', () => {
  let component: ProvisionTabsComponent;
  let fixture: ComponentFixture<ProvisionTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

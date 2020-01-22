import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTabsComponent } from './configure-tabs.component';

describe('ConfigureTabsComponent', () => {
  let component: ConfigureTabsComponent;
  let fixture: ComponentFixture<ConfigureTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

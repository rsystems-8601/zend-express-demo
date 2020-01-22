import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabedListComponent } from './tabed-list.component';

describe('TabedListComponent', () => {
  let component: TabedListComponent;
  let fixture: ComponentFixture<TabedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

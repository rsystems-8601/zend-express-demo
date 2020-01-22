import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationGroupViewComponent } from './application-group-view.component';

describe('ApplicationGroupViewComponent', () => {
  let component: ApplicationGroupViewComponent;
  let fixture: ComponentFixture<ApplicationGroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationGroupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodsConfigureComponent } from './pods-configure.component';

describe('PodsConfigureComponent', () => {
  let component: PodsConfigureComponent;
  let fixture: ComponentFixture<PodsConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodsConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodsConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

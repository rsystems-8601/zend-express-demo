import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodsCreateComponent } from './pods-create.component';

describe('PodsCreateComponent', () => {
  let component: PodsCreateComponent;
  let fixture: ComponentFixture<PodsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodsProvisionsComponent } from './pods-provisions.component';

describe('PodsProvisionsComponent', () => {
  let component: PodsProvisionsComponent;
  let fixture: ComponentFixture<PodsProvisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodsProvisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodsProvisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

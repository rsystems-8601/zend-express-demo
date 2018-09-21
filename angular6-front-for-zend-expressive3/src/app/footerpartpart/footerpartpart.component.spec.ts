import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterpartpartComponent } from './footerpartpart.component';

describe('FooterpartpartComponent', () => {
  let component: FooterpartpartComponent;
  let fixture: ComponentFixture<FooterpartpartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterpartpartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterpartpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

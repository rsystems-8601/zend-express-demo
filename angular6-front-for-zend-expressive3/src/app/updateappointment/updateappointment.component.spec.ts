import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateappointmentComponent } from './updateappointment.component';

describe('UpdateappointmentComponent', () => {
  let component: UpdateappointmentComponent;
  let fixture: ComponentFixture<UpdateappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

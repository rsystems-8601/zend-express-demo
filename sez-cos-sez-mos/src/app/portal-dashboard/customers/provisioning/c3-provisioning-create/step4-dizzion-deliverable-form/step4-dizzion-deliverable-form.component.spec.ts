import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4DizzionDeliverableFormComponent } from './step4-dizzion-deliverable-form.component';

describe('Step4DizzionDeliverableFormComponent', () => {
  let component: Step4DizzionDeliverableFormComponent;
  let fixture: ComponentFixture<Step4DizzionDeliverableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step4DizzionDeliverableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step4DizzionDeliverableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

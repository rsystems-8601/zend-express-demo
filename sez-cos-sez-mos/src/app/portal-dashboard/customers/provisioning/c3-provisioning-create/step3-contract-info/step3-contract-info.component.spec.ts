import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3ContractInfoComponent } from './step3-contract-info.component';

describe('Step3ContractInfoComponent', () => {
  let component: Step3ContractInfoComponent;
  let fixture: ComponentFixture<Step3ContractInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step3ContractInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3ContractInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

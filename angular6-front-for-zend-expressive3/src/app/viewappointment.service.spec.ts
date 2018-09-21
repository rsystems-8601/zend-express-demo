import { TestBed } from '@angular/core/testing';

import { ViewappointmentService } from './viewappointment.service';

describe('ViewappointmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewappointmentService = TestBed.get(ViewappointmentService);
    expect(service).toBeTruthy();
  });
});

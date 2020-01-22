import { TestBed } from '@angular/core/testing';

import { C3ProvisioningService } from './c3-provisioning.service';

describe('C3ProvisioningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: C3ProvisioningService = TestBed.get(C3ProvisioningService);
    expect(service).toBeTruthy();
  });
});

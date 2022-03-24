import { TestBed } from '@angular/core/testing';

import { VbsRequestService } from './vbs-request.service';

describe('VbsRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VbsRequestService = TestBed.get(VbsRequestService);
    expect(service).toBeTruthy();
  });
});

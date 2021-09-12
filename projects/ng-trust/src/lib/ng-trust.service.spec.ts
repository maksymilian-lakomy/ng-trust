import { TestBed } from '@angular/core/testing';

import { NgTrustService } from './ng-trust.service';

describe('NgTrustService', () => {
  let service: NgTrustService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgTrustService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

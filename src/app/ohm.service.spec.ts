import { TestBed } from '@angular/core/testing';

import { OhmService } from './ohm.service';

describe('OhmService', () => {
  let service: OhmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OhmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

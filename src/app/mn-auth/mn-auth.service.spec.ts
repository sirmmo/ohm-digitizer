import { TestBed, inject } from '@angular/core/testing';

import { MnAuthService } from './mn-auth.service';

describe('MnAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MnAuthService]
    });
  });

  it('should be created', inject([MnAuthService], (service: MnAuthService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { RetailersService } from './retailers.service';

describe('RetailersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RetailersService]
    });
  });

  it('should be created', inject([RetailersService], (service: RetailersService) => {
    expect(service).toBeTruthy();
  }));
});

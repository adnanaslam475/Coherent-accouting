import { TestBed, inject } from '@angular/core/testing';

import { AmazonItemsService } from './amazon-items.service';

describe('AmazonItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmazonItemsService]
    });
  });

  it('should be created', inject([AmazonItemsService], (service: AmazonItemsService) => {
    expect(service).toBeTruthy();
  }));
});

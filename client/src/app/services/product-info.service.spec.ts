import { TestBed, inject } from '@angular/core/testing';

import { ProductInfoService } from './product-info.service';

describe('ProductInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductInfoService]
    });
  });

  it('should be created', inject([ProductInfoService], (service: ProductInfoService) => {
    expect(service).toBeTruthy();
  }));
});

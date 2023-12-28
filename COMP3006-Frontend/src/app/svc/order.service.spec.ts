import { TestBed } from '@angular/core/testing';

import { ngOrderService } from './order.service';

describe('OrderService', () => {
  let service: ngOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ngOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

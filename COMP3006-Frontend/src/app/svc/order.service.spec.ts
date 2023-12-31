import { TestBed } from '@angular/core/testing';

import { NgOrderService } from './order.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NgOrderService', () => {
  let service: NgOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(NgOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

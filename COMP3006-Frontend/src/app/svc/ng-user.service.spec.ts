import { TestBed } from '@angular/core/testing';

import { NgUserService } from './ng-user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from'@angular/common/http/testing';

describe('NgUserService', () => {
  let service: NgUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(NgUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

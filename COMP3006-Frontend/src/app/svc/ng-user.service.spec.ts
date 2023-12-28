import { TestBed } from '@angular/core/testing';

import { NgUserService } from './ng-user.service';

describe('NgUserService', () => {
  let service: NgUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

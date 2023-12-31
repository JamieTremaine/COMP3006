import { TestBed } from '@angular/core/testing';

import { NgMenuService } from './menu.service';

describe('MenuService', () => {
  let service: NgMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isRestaurantGuard } from './is-restaurant.guard';

describe('isRestaurantGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isRestaurantGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

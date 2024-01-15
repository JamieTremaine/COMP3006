import { CanActivateFn } from '@angular/router';

export const isRestaurantGuard: CanActivateFn = (route, state) => {
  return true;
};

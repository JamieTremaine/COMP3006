import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { NgUserService } from '../svc/ng-user.service';
import { map } from 'rxjs';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
    
    const userService = inject(NgUserService)
    return userService.isLoggedIn() ? true : createUrlTreeFromSnapshot(route, ['/', 'login'])
  };

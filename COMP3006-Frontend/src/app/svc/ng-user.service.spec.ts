import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgUserService } from './ng-user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from'@angular/common/http/testing';
import { UserService } from '../api/services';
import { of } from 'rxjs';
import { PersistanceService } from './persistance.service';
import { User } from '../api/models';

describe('NgUserService', () => {
    let service: NgUserService;
    let userService: UserService;
    let persistanceService: PersistanceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [provideHttpClient(), provideHttpClientTesting()]
        });
        service = TestBed.inject(NgUserService);
        userService = TestBed.inject(UserService);
        persistanceService = TestBed.inject(PersistanceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login',fakeAsync(async () => {

        spyOn(userService, 'userLoginPost').and.returnValue(of({_id: '1234'}));
        const result = await service.login('username', 'password');

        expect(result).toBeTrue();
    }));

    it('should not login on wrong creds',fakeAsync(async () => {

        spyOn(userService, 'userLoginPost').and.returnValue(of({}));
        const result = await service.login('username', 'password');

        expect(result).toBeFalse();
    }));

    it('should logout', () => {
        service.logout();

        expect(service['loggedIn']).toBeFalse();
        expect(service['user']).toBeUndefined();
    });

    it('should set user', () => {
        const user: User = { _id: '1234', username: 'username', type: 'user' };
        service.setUser(user);

        expect(service['loggedIn']).toBeTrue();
        expect(service['user']).toBe(user);
    });

});

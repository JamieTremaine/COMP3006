import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateAccountComponent } from './create-account.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RestaurantService, UserService } from '../../api/services';
import { Restaurant } from '../../api/models';
import { of } from 'rxjs';
import { Severity, ToastService } from '../../svc/toast.service';
import { LoginComponent } from '../login/login.component';

describe('CreateAccountComponent', () => {
    let component: CreateAccountComponent;
    let fixture: ComponentFixture<CreateAccountComponent>;
    let restaurantService: RestaurantService
    let userService: UserService;
    let toasterService: ToastService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [CreateAccountComponent],
        providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([{path: 'login', component: LoginComponent}])]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(CreateAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        restaurantService = TestBed.inject(RestaurantService);
        userService = TestBed.inject(UserService);
        toasterService = TestBed.inject(ToastService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get all restaurants', fakeAsync(() =>{

        const restaurants: Restaurant[] = [{_id:'restaurantOne', name: 'one'}, {_id:'restaurantTwo', name: 'two'},]

        spyOn(restaurantService, 'restaurantGetAllGet').and.returnValue(of(restaurants));

        component.ngOnInit();
        tick();

        expect(component.restaurants).toEqual(restaurants);
    }));

    it('should add address', () => {

        component.addressForm.get('addresslineOne')?.setValue('lineOne');
        component.addressForm.get('addresslineTwo')?.setValue('lineTwo')
        component.addressForm.get('postcode')?.setValue('postcode');

        component.addAddress();

        expect(component.addresses).toEqual([{ addresslineOne: 'lineOne', addresslineTwo: 'lineTwo', postcode: 'postcode' }]);
    });

    it('should open address form', () => {
        component.openAddressForm();

        expect(component.addingAddress).toBeTrue();
    });

    it('should prevent creating invalid acount', fakeAsync(() => {

        const toastSpy = spyOn(toasterService, 'show');
        let userSpy = spyOn(userService, 'userPost').and.returnValue(of({}));

        component.createAccount();

        expect(toastSpy).toHaveBeenCalledOnceWith('Not all fields have been set', Severity.danger, 5000);
        expect(userSpy).toHaveBeenCalledTimes(0);

        toastSpy.calls.reset()

        component.createAccountForm.get('username')?.setValue('username');
        component.createAccountForm.get('password')?.setValue('password')
        component.createAccountForm.get('repeatPassword')?.setValue('passwordDifferent');

        component.createAccount();

        expect(toastSpy).toHaveBeenCalledOnceWith('Passwords do not match', Severity.danger, 5000);
        expect(userSpy).toHaveBeenCalledTimes(0);

        toastSpy.calls.reset();

        component.createAccountForm.get('username')?.setValue('username');
        component.createAccountForm.get('password')?.setValue('password')
        component.createAccountForm.get('repeatPassword')?.setValue('password');

        component.createAccount();

        expect(toastSpy).toHaveBeenCalledOnceWith('At least one address must be set', Severity.danger, 5000);
        expect(userSpy).toHaveBeenCalledTimes(0);

        toastSpy.calls.reset();

        component.createAccountForm.get('username')?.setValue('username');
        component.createAccountForm.get('password')?.setValue('password')
        component.createAccountForm.get('repeatPassword')?.setValue('password');

        component.addressForm.get('addresslineOne')?.setValue('lineOne');
        component.addressForm.get('addresslineTwo')?.setValue('lineTwo')
        component.addressForm.get('postcode')?.setValue('postcode');

        component.addAddress();

        component.createAccount();
        tick();

        expect(toastSpy).toHaveBeenCalledOnceWith('Account created', Severity.success, 5000);
        expect(userSpy).toHaveBeenCalledOnceWith({body: 
            { username: 'username', password: 'password', type: 'user', addresses: [ { addresslineOne: 'lineOne', addresslineTwo: 'lineTwo', postcode: 'postcode' } as any ]}
        });


    }))
});

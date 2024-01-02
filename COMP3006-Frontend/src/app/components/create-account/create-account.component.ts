import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Severity, ToastService } from '../../svc/toast.service';
import { RestaurantService, UserService } from '../../api/services';
import { lastValueFrom } from 'rxjs';
import { Restaurant } from '../../api/models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-account',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-account.component.html',
    styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent implements OnInit {

    addingAddress: boolean = false;
    addresses: any = [];

    createAccountForm: FormGroup;
    addressForm: FormGroup;
    restaurants?: Array<Restaurant>;

    constructor(private toasterService: ToastService, private userService: UserService, private restaurantService: RestaurantService, private router: Router) {
        this.createAccountForm = this.createAccountsForm();
        this.addressForm = this.crateAddressForm();
    }


    ngOnInit(): void {
       lastValueFrom(this.restaurantService.restaurantGetAllGet()).then((result)=>{
            this.restaurants = result;
            if(result.length > 0) {
                this.createAccountForm.get('restaurant')?.setValue(result[0]._id)
            }
          
       });
    }

    createAccountsForm(): FormGroup {
        return new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            repeatPassword: new FormControl('', Validators.required),
            type: new FormControl('user', Validators.required),
            restaurant: new FormControl('',)
        });
    }

    crateAddressForm(){
        return new FormGroup({
            addresslineOne: new FormControl('', Validators.required),
            addresslineTwo: new FormControl('', Validators.required),
            postcode:  new FormControl('', Validators.required)
        });
    }

    addAddress() {
        this.addingAddress = false;
        const address = this.addressForm.value;
        console.log(address)
        this.addresses.push(address);
        
    }

    openAddressForm() {
        this.addingAddress = true;
        this.addressForm.reset();
    }

    createAccount() {
        console.log(this.createAccountForm.valid);
        if (!this.createAccountForm.valid) {
            this.toasterService.show('Not all fields have been set', Severity.danger, 5000);
            return;
        }

        if (this.createAccountForm.value.password !== this.createAccountForm.value.repeatPassword) {
            this.toasterService.show('Passwords do not match', Severity.danger, 5000);
            return;
        }

        if (this.createAccountForm.value.type === 'user' && this.addresses.length === 0) {
            this.toasterService.show('At least one address must be set', Severity.danger, 5000);
            return;
        }
        const userFormValue = this.createAccountForm.value;

        let user;
        if(userFormValue.type === 'user') {
            user = { username: userFormValue.username, password: userFormValue.password, type: 'user', addresses: this.addresses};
        } else {
            user = { username: userFormValue.username, password: userFormValue.password, type: 'restaurant', restaurantId: userFormValue.restaurant._id};
        }

        lastValueFrom(this.userService.userPost({body: user})).then(result => {
            console.log('success')
            this.toasterService.show('Account created', Severity.success, 5000);
            this.router.navigate(['/login']);          
        }).catch((error) => {
            console.log(error)
            this.toasterService.show('Could not create account: ' + error.error.denialReason, Severity.danger, 5000);
        });
    }

}

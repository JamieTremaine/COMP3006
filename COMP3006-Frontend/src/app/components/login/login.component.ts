import { Component } from '@angular/core';
import { NgUserService } from '../../svc/ng-user.service';
import { Router, RouterLink } from '@angular/router';
import { Severity, ToastService } from '../../svc/toast.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private ngUserService: NgUserService, private router: Router, private toaster: ToastService) { 
        this.loginForm = this.createForm();
    }

    login() {
        const formValue = this.loginForm.value
        this.ngUserService.login(formValue.username, formValue.password).then((result)=>{
            if(result) {
                this.router.navigate(['']);
            } else {
                this.toaster.show('Incorrect login', Severity.danger, 5000);
            }
        });
    }

    private createForm(): FormGroup {
        return new FormGroup({
            username: new FormControl(''),
            password: new FormControl('')
        });
    }

}

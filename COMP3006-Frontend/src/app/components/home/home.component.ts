import { Component, OnInit } from '@angular/core';
import { UserHomeComponent } from '../restaurant-user/home/home.component';
import { NgUserService } from '../../svc/ng-user.service';
import { ResturantHomeComponent } from '../restaurant/home/home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserHomeComponent, ResturantHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    userType?: string;

    constructor(private ngUSerService: NgUserService) {}


    ngOnInit(): void {
        this.userType = this.ngUSerService.getUser()?.type;
    }
}

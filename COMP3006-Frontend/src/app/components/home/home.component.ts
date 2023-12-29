import { Component } from '@angular/core';
import { UserHomeComponent } from '../restaurant-user/home/home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

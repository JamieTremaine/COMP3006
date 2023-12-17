import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  restaurants: Array<any> = [{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},]

}

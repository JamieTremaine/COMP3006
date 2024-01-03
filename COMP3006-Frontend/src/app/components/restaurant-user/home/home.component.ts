import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Restaurant } from '../../../api/models';
import { RestaurantService } from '../../../api/services';
import { HeaderService } from '../../../svc/header.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { PageComponent } from '../../utils/page/page.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class UserHomeComponent extends PageComponent implements OnInit {

  restaurants?: Array<Restaurant>;

  constructor(protected override headerService: HeaderService, private restaurantService: RestaurantService) {
      super(headerService);
  }

  ngOnInit(): void {
      this.setHeader('Resturant Ordering System');
      this.loadResturaunts();
  }

  loadResturaunts() {
      lastValueFrom(this.restaurantService.restaurantGetAllGet()).then((result) => {
          this.restaurants = result;
      })

  }

}

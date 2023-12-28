import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { PageComponent } from '../utils/page/page.component';
import { HeaderService } from '../../svc/header.service';
import { RestaurantService } from '../../api/services';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Restaurant } from '../../api/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SearchbarComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends PageComponent implements OnInit {

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

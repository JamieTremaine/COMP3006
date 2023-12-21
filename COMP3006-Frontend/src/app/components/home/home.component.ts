import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { PageComponent } from '../utils/page/page.component';
import { HeaderService } from '../../svc/header.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends PageComponent implements OnInit {

    restaurants: Array<any> = [{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},]

    constructor(protected override headerService: HeaderService) {
        super(headerService);
    }

    ngOnInit(): void {
        this.setHeader('Resturant Ordering System');
    }

}

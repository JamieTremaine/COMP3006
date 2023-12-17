import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: Array<any> = [{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},]

}

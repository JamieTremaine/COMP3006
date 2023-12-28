import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-previous-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.scss'
})
export class PreviousOrdersComponent {

  orders: Array<any> = [{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},]

}

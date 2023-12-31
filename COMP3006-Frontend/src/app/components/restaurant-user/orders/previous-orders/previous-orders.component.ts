import { Component } from '@angular/core';

@Component({
  selector: 'app-previous-orders',
  standalone: true,
  imports: [],
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.scss'
})
export class PreviousOrdersComponent {

  orders: Array<any> = [{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},{id: "hello"},]

}

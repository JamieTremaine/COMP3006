import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {

  item: any = { id:"hello", name: 'burgers', itemType: ['featured', ], image: " ", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400}, extras: ['','',''] }

}

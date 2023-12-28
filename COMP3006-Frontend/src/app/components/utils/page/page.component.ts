import { Component } from '@angular/core';
import { HeaderService } from '../../../svc/header.service';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {

    constructor(protected headerService: HeaderService){}

    public setHeader(header?: string): void {
        this.headerService.currentTitle = header;
    }
}

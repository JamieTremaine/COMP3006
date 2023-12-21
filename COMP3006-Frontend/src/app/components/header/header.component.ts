import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../svc/header.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgbDropdownModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    constructor(protected headerService: HeaderService, private location: Location) {}

    onBack(): void {
        this.location.back()
    }

}

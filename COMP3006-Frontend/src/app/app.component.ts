import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchbarComponent } from './components/shared/searchbar/searchbar.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { PersistanceService } from './svc/persistance.service';
import { NgUserService } from './svc/ng-user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SearchbarComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(private persistanceService: PersistanceService, private ngUserService: NgUserService) {}

    ngOnInit(): void {
        const user = this.persistanceService.getUser();
        this.ngUserService.setUser(user);
    }
}

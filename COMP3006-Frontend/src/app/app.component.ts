import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { PersistanceService } from './svc/persistance.service';
import { NgUserService } from './svc/ng-user.service';
import { WebsocketService } from './svc/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(private persistanceService: PersistanceService, private ngUserService: NgUserService, private websocketService: WebsocketService) {}

    ngOnInit(): void {
        const user = this.persistanceService.getUser();
        this.ngUserService.setUser(user);
    }
}

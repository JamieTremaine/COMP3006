import { Component, inject } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../svc/toast.service';

@Component({
    selector: 'app-toasts',
    standalone: true,
    imports: [NgbToastModule, NgTemplateOutlet],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss'
})
export class ToastComponent {

    constructor(public toastService: ToastService) {}
}


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-toast',
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {

  constructor(private messageService: MessageService) {}

  clear() {
    this.messageService.clear(); // Méthode pour effacer les notifications
  }
}

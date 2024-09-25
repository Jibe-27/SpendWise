import { Injectable} from '@angular/core';
import { MessageService } from 'primeng/api';
import { NOTIFICATION_DURATION } from '../constant.shared';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationDuration = NOTIFICATION_DURATION;

  constructor(
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  private async addNotification(severity: string, summary: string, detail: string) {
    detail=this.translate.instant(detail);
    this.messageService.add({ severity, summary, detail, life: this.notificationDuration });
  }

  success(detail: string) {
    this.addNotification('success', '', detail);
  }

  error(detail: string) {
    this.addNotification('error', '', detail);
  }

  info(detail: string) {
    this.addNotification('info', '', detail);
  }

  warn(detail: string) {
    this.addNotification('warn', '', detail);
  }

  clear() {
    this.messageService.clear();
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent {
  @Input() data: any;
  @Input() options: any;
  @Input() totalExpenses: number = 0;
  @Output() showModal = new EventEmitter<void>();

  showModalDialog(): void {
    this.showModal.emit();
  }
}

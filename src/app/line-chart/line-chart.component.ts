import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  @Input() data: any;
  @Input() options: any;
  @Output() showModal = new EventEmitter<void>();

  showModalDialog(): void {
    this.showModal.emit();
  }
}

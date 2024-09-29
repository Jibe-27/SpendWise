import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss'],
})
export class ExpenseCardComponent {
  @Input() title: string = '';
  @Input() amount: number = 0;
  @Input() color: string = '';
}

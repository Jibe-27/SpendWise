import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Expense } from '../shared/model.shared';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss'],
})
export class ExpenseTableComponent {
  @Input() expenses: Expense[] = [];
  @Output() viewDetails = new EventEmitter<Expense>();

  onViewDetails(expense: Expense): void {
    this.viewDetails.emit(expense);
  }
}

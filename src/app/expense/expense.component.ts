import { Component, OnInit } from '@angular/core';
import { ExpenseService } from './expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../shared/model.shared';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  expense!: Expense;

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getExpense();
  }

  getExpense(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.expenseService.getExpense(id).subscribe((expense: Expense) => {
      this.expense = expense;
      console.log(expense);
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../expense/expense.service';
import { Expense, Category } from '../shared/model.shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: any;
  options: any;
  expenses: Expense[] = [];
  categories: Category[] = [];
  totalExpenses: number = 0;
  displayModal: boolean = false;
  expenseForm: FormGroup;
  private userId: number = 1; // Assuming user ID is 1 for this example

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      store: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadCategories();
    this.initializeChartData();
  }

  private loadExpenses(): void {
    this.expenseService.getExpenses(this.userId).subscribe((expenses) => {
      this.expenses = expenses;
      this.calculateTotalExpenses();
    });
  }

  private loadCategories(): void {
    this.expenseService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.expenseService
      .getUserCategories(this.userId)
      .subscribe((categories) => {
        this.categories = [...this.categories, ...categories];
      });
  }

  private calculateTotalExpenses(): void {
    this.totalExpenses = this.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }

  getTotalByCategory(categoryName: string): number {
    return this.expenses
      .filter((expense) => expense.category.name === categoryName)
      .reduce((sum, expense) => sum + expense.amount, 0);
  }

  getPercentageByCategory(categoryName: string): number {
    const totalByCategory = this.getTotalByCategory(categoryName);
    return (totalByCategory / this.totalExpenses) * 100;
  }

  private initializeChartData(): void {
    this.data = {
      labels: this.expenses.map((expense) => expense.category.name),
      datasets: [
        {
          data: this.expenses.map((expense) => expense.amount),
          backgroundColor: this.expenses.map(
            (expense) => expense.category.color
          ),
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  }

  addExpense(): void {
    if (this.expenseForm.valid) {
      const formValues = this.expenseForm.value;
      const selectedCategory = this.categories.find(
        (cat) => cat.name === formValues.category
      );
      const newExpense: Expense = {
        datetime: new Date().toISOString(),
        category: selectedCategory!,
        store: formValues.store,
        amount: formValues.amount,
        description: formValues.description,
      };
      this.expenseService.addExpense(newExpense).subscribe((expense) => {
        this.expenses.push(expense);
        this.calculateTotalExpenses();
        this.displayModal = false;
        this.expenseForm.reset();
      });
    }
  }

  showModalDialog(): void {
    this.displayModal = true;
  }
}

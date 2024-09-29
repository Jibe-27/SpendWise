import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../expense/expense.service';
import { Expense, Category, User } from '../shared/model.shared';
import { AuthService } from '../authentication/authentication.service';

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
  private user: User | null = null;
  userBudget: number | null = null;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private authService: AuthService
  ) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      store: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      this.userBudget = this.user.budget;
      console.log('Current User:', this.user.name, this.user.budget);
      this.loadExpenses();
      this.loadCategories();
    }
  }

  getUserid(): string | null {
    return this.user ? this.user.name.toString() : null;
  }

  private loadExpenses(): void {
    if (this.user) {
      this.expenseService.getExpenses(this.user.id).subscribe((expenses) => {
        this.expenses = expenses;
        console.log(expenses);
        this.calculateTotalExpenses();
        this.initializeChartData();
      });
    }
  }

  private loadCategories(): void {
    if (this.user) {
      this.expenseService.getCategories().subscribe((categories) => {
        this.categories = categories;
      });
      this.expenseService
        .getUserCategories(this.user.id)
        .subscribe((categories) => {
          this.categories = [...this.categories, ...categories];
        });
    }
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
        user: this.user!, // Use the user in the new expense
      };
      this.expenseService.addExpense(newExpense).subscribe((expense) => {
        this.expenses.push(expense);
        this.calculateTotalExpenses();
        this.initializeChartData();
        this.displayModal = false;
        this.expenseForm.reset();
      });
    }
  }

  showModalDialog(): void {
    this.displayModal = true;
  }
}

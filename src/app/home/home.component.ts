import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense/expense.service';
import { Expense, Category, User } from '../shared/model.shared';
import { AuthService } from '../authentication/authentication.service';

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface Dataset {
  data: number[];
  backgroundColor: string[];
}

export interface ChartOptions {
  plugins: {
    legend: {
      display: boolean;
    };
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: ChartData = { labels: [], datasets: [] };
  options: ChartOptions = { plugins: { legend: { display: false } } };
  expenses: Expense[] = [];
  categories: Category[] = [];
  totalExpenses: number = 0;
  displayModal: boolean = false;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    if (currentUser && currentUser.id) {
      this.authService
        .getUserById(currentUser.id.toString())
        .subscribe((user) => {
          this.user = user;
          console.log('Current User:', this.user.name, this.user.budget);
          this.loadExpenses();
          this.loadCategories();
        });
    } else {
      console.log('No user is currently logged in.');
    }
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

  onAddExpense(expense: any): void {
    if (this.user) {
      const selectedCategory = this.categories.find(
        (cat) => cat.name === expense.category
      );
      const newExpense: Expense = {
        id: 0,
        datetime: this.formatDate(new Date()),
        category: selectedCategory!,
        store: expense.store,
        amount: expense.amount,
        description: expense.description,
        userId: this.user.id,
      };
      console.log('date:', newExpense.datetime);
      this.expenseService.addExpense(newExpense).subscribe((expense) => {
        this.expenses.push(expense);
        this.calculateTotalExpenses();
        this.initializeChartData();
        this.displayModal = false;
      });
    } else {
      console.log('User is not logged in');
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }

  showModalDialog(): void {
    this.displayModal = true;
  }

  onCloseModal(): void {
    this.displayModal = false;
  }

  onViewExpenseDetails(expense: Expense): void {
    console.log('Viewing details for expense:', expense);
    this.router.navigate(['/home/expense', expense.id]);
  }
}

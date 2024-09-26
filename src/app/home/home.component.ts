import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Expense {
  date: string;
  category: string;
  store: string;
  amount: number;
  description: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public data: any;
  public options: any;
  public expenses: Expense[] = [];
  public totalExpenses: number = 0;
  public displayModal: boolean = false;
  public expenseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      color: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeExpenses();
    this.initializeChartData();
  }

  private initializeExpenses(): void {
    this.expenses = [
      {
        date: '2024-09-01',
        category: 'Loyer',
        store: 'Supermarché',
        amount: 1200,
        description: 'Loyer mensuel',
        color: '#4BC0C0',
        icon: 'pi pi-ellipsis-h',
      },
      {
        date: '2024-09-05',
        category: 'Courses',
        amount: 200,
        store: 'Cinéma',
        description: 'Courses hebdomadaires',
        color: '#FF9F40',
        icon: 'pi pi-film',
      },
      {
        date: '2024-09-10',
        category: 'Services publics',
        amount: 100,
        store: 'EDF',
        description: "Facture d'électricité",
        color: '#FFCE56',
        icon: 'pi pi-bolt',
      },
      {
        date: '2024-09-15',
        category: 'Divertissement',
        amount: 50,
        store: 'Propriétaire',
        description: 'Cinéma',
        color: '#FF9F40',
        icon: 'pi pi-film',
      },
      {
        date: '2024-09-20',
        category: 'Autres',
        amount: 150,
        store: 'Restaurant',
        description: 'Achat divers',
        color: '#4BC0C0',
        icon: 'pi pi-ellipsis-h',
      },
    ];
    this.expenses.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  private initializeChartData(): void {
    this.data = {
      labels: [
        'Loyer',
        'Courses',
        'Services publics',
        'Divertissement',
        'Autres',
      ],
      datasets: [
        {
          data: [300, 500, 100, 200, 150],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF9F40',
            '#4BC0C0',
          ],
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

  getRandomPercentage(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  addExpense(): void {
    if (this.expenseForm.valid) {
      this.expenses.push(this.expenseForm.value);
      this.displayModal = false;
      this.expenseForm.reset();
    }
  }

  showModalDialog(): void {
    this.displayModal = true;
  }
}

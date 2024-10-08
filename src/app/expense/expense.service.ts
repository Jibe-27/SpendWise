import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Expense, Category } from '../shared/model.shared';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getExpenses(userId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(
      `${this.apiUrl}/expenses/user/${userId}`
    );
  }

  getExpense(id: number): Observable<Expense> {
    return this.http
      .get<Expense[]>(`${this.apiUrl}/expenses/${id}`)
      .pipe(
        map((response: any) =>
          Array.isArray(response) ? response[0] : response
        )
      );
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/expenses`, expense);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/generalCategories`);
  }

  getUserCategories(userId: number): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiUrl}/userCategories?userId=${userId}`
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(
    private http : HttpClient
  ) { }
   GetAllCategories(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/categories');
  }
  getCategoriesByIdUser(id: number): Observable<any>{
    return this.http.get<any>('http://localhost:3000/Categories/?userId='+id);
  }
  getAllExpenses(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/expenses');
  }

  calculateTotalExpensesByCategory(): Observable<any> {
    return forkJoin({
      categories: this.GetAllCategories(),
      expenses: this.getAllExpenses()
    }).pipe(
      map(({ categories, expenses }) => {
        const categoryTotals: { [key: number]: { name: string, total: number } } = {};

        // Initialize category totals
        categories.forEach((category: any) => {
          categoryTotals[category.id] = { name: category.name, total: 0 };
        });

        // Sum expenses by category
        expenses.forEach((expense: any) => {
          if (categoryTotals[expense.categoryId]) {
            categoryTotals[expense.categoryId].total += expense.amount;
          }
        });

        return categoryTotals;
      })
    );
  }
}



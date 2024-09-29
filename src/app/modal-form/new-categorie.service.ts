import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User,GeneralCategory,Categorie } from 'src/app/shared/model.shared';

@Injectable({
  providedIn: 'root'
})
export class NewCategorieService {
  private url = ' http://localhost:3000/userCategories';

  constructor(private http: HttpClient) { }

  AddNewCategorie(data: Categorie): Observable<any> {
    return this.getCategories().pipe(
      map(categories => {
        const newId = this.generateNewId(categories);
        const newCategory = { ...data, id: newId };
        return newCategory;
      }),
      switchMap(newCategory => this.http.post<any>(this.url, newCategory)),
      catchError(this.handleError)
    );
  }
  GetAllCategories(): Observable<GeneralCategory[]>{
    return this.http.get<GeneralCategory[]>('http://localhost:3000/generalCategories');
  }
  getCategoriesByIdUser(id: number): Observable<any>{
    return this.http.get<any>('http://localhost:3000/userCategories/?userId='+id);
  }

  private getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  private generateNewId(categories: Categorie[]): number {
    const ids = categories.map(category => category.id).filter(id => id !== undefined) as number[];
    return Math.max(...ids) + 1;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}


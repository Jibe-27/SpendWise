import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewCategorieService {
  private url = 'http://localhost:3000/categories';

  private svgIcons: { name: string, path: string }[] = [
    { name: 'Birthday', path: 'assets/icons/birthday-cake.svg' },
    { name: 'Patisserie', path: 'assets/icons/blender.svg' },
    { name: 'Formation Cuisine', path: 'assets/icons/chef-man-cap.svg' },
    { name: 'Carte de Crédit', path: 'assets/icons/grater.svg' },
    { name: 'Burger', path: 'assets/icons/humberger.svg' },
    { name: 'glace', path: 'assets/icons/ice-cream-cone.svg' },
  ];

  constructor(private http: HttpClient) { }

  getSvgIcons(): { name: string, path: string }[] {
    return this.svgIcons;
  }

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

export interface Categorie {
  id?: number;
  name: string;
  color: string;
  icon?: string;
}
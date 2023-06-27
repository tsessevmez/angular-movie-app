import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryServices {
  url_firebase = 'https://angular-movie-app-c04ac-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.url_firebase + 'categories.json')
      .pipe(
        map((response) => {
          const category: Category[] = [];

          for (const key in response) {
            category.push({ ...response[key], id: key });
          }

          return category;
        })
      );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      this.url_firebase + 'categories.json',
      category
    );
  }
}

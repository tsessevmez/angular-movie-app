import { Component, OnInit } from '@angular/core';
import { Category } from './models/category.model';
import { CategoryServices } from './services/category.services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryServices],
})
export class CategoryComponent implements OnInit {
  // categories = ['Action', 'Drama', 'Romantic', 'Sci-Fi'];

  categories: Category[];
  selectedCategory: Category = null;
  constructor(private categoryServices: CategoryServices) {}

  ngOnInit(): void {
    this.categoryServices.getCategories().subscribe((data) => {
      this.categories = data;
      // this.selectCategory = this.categories;
    });
  }

  displayAll: boolean = true;

  selectCategory(item?: Category) {
    if (item) {
      this.selectedCategory = item;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }
}

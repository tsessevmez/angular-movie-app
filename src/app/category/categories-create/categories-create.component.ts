import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { CategoryServices } from '../category.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css'],
  providers: [CategoryServices],
})
export class CategoriesCreateComponent implements OnInit {
  constructor(
    private categoryService: CategoryServices,
    private router: Router
  ) {}

  ngOnInit(): void {}
  createCategory(name: string) {
    const category: Category = {
      name: name,
    };
    this.categoryService.createCategory(category).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/']);
    });
  }
}

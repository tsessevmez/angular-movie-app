import { NgModule } from '@angular/core';
import { CategoriesCreateComponent } from './categories-create/categories-create.component';
import { CategoryComponent } from './category.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [CategoryComponent, CategoriesCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'categories/create',
        component: CategoriesCreateComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  exports: [CategoryComponent, CategoriesCreateComponent],
})
export class CategoriesModule {}

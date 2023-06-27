import { NgModule } from '@angular/core';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieFilterPipe } from './movie-filter.pipe';
import { MoviesHomeComponent } from './movies-home/movies-home.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SummaryPipe } from './summary.pipe';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movie-routing.module';
import { CategoriesModule } from '../category/categories.module';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieDetailsComponent,
    SummaryPipe,
    MovieFilterPipe,
    MovieCreateComponent,
    MoviesHomeComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MoviesRoutingModule,
    CategoriesModule,
  ],
  exports: [
    MoviesComponent,
    MovieDetailsComponent,
    SummaryPipe,
    MovieFilterPipe,
    MovieCreateComponent,
    MoviesHomeComponent,
  ],
})
export class MoviesModule {}

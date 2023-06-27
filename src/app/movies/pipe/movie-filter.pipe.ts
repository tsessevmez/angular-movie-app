import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie.model';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
  transform(movies: Movie[], filterText: string): Movie[] {
    filterText = filterText.toLowerCase();

    return filterText
      ? movies.filter(
          (m: Movie) =>
            m.title.toLowerCase().indexOf(filterText) ||
            m.description.toLowerCase().indexOf(filterText) !== -1
        )
      : movies;
  }
}

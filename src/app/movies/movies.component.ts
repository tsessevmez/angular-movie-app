import { Component, OnInit } from '@angular/core';
import { Movie } from './models/movie.model';
import { AlertifyService } from '../shared/alertify.services';
import { MovieService } from './services/movie.services';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  // populerMovies: Movie[];
  filteredMovies: Movie[] = [];
  // today = new Date();
  userId: string;
  movieList: string[] = [];
  filterText: string = '';
  error: any;
  loading: boolean = false;

  constructor(
    private alertify: AlertifyService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  title: string = 'Film listesi';

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.userId = user.id;

        this.activatedRoute.params.subscribe((params) => {
          this.loading = true;
          this.movieService.getMovies(params['categoryId']).subscribe(
            (data) => {
              this.movies = data;
              this.filteredMovies = this.movies;
              this.movieService.getList(this.userId).subscribe((data) => {
                this.movieList = data;
                console.log(this.movieList);
              });
              this.loading = false;
            },
            (error) => {
              this.error = error;
              this.loading = false;
            }
          );
        });
      }
    });
  }

  onInputChange() {
    this.filteredMovies = this.filterText
      ? this.movies.filter(
          (m) =>
            m.title.toLowerCase().indexOf(this.filterText) !== -1 ||
            m.description.toLowerCase().indexOf(this.filterText) !== -1
        )
      : this.movies;
  }

  addToList($event: any, movie: Movie) {
    if ($event.target.classList.contains('btn-primary')) {
      $event.target.innerText = 'Remove Basket';
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');

      this.movieService
        .addToMyList({
          userId: this.userId,
          movieId: movie.id,
        })
        .subscribe(() => {
          this.alertify.success(movie.title + ' add list');
        });
    } else {
      $event.target.innerText = 'Add to List';
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');

      this.movieService
        .removeFromList({
          userId: this.userId,
          movieId: movie.id,
        })
        .subscribe(() => {
          this.alertify.error(movie.title + ' remove the list');
        });
    }
  }

  getButtonstate(movie: Movie) {
    return this.movieList.findIndex((m) => m === movie.id) > -1;
  }
}

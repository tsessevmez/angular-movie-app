import { Component, OnInit } from '@angular/core';
import { CategoryServices } from '../../category/category.services';
import { Category } from '../../category/category.model';
import { MovieService } from '../movie.services';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.services';
import {
  FormControl,
  FormGroup,
  NgForm,
  NgModel,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryServices, MovieService],
})
export class MovieCreateComponent implements OnInit {
  categories: Category[];

  model: any = {
    categoryId: '',
  };

  constructor(
    private categoryService: CategoryServices,
    private movieService: MovieService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  movieForm = new FormGroup({
    title: new FormControl('Movie Name', [
      Validators.required,
      Validators.minLength(5),
    ]),
    description: new FormControl('Lorem ipsum', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    imageUrl: new FormControl('example.jpeg', [Validators.required]),
    categoryId: new FormControl('-1', [Validators.required, ,]),
  });

  get title() {
    return this.movieForm.get('title');
  }

  clearForm() {
    this.movieForm.patchValue({
      title: '',
      description: '',
      imageUrl: '',
      categoryId: '',
    });
  }

  createMovie() {
    // if (
    //   title.value === '' ||
    //   description.value === '' ||
    //   imageUrl === '' ||
    //   categoryId.value === '-1'
    // ) {
    //   this.alertify.error('Tum alanlari doldurun lutfen!!');
    //   return;
    // }

    // if (title.value.length < 5) {
    //   this.alertify.warning('Title 5 karakterden az olamaz');
    //   return;
    // }

    // if (description.value.length < 5 || description.value.length > 30) {
    //   this.alertify.warning(
    //     'desc 5 karakterden az 30 karakterden de fazla olamaz'
    //   );
    //   return;
    // }

    // const extensions = ['jpeg', 'jpg', 'png'];

    // const extension = this.model.imageUrl.split('.').pop();

    // if (extensions.indexOf(extension) === -1) {
    //   this.alertify.error('Sadece resim uzantilari, jpeg,jpg,png');
    //   return;
    // }

    // const movie = {
    //   id: 0,
    //   title: this.model.title,
    //   description: this.model.description,
    //   imageUrl: this.model.imageUrl,
    //   isPopuler: false,
    //   datePublished: new Date(),
    //   categoryId: this.model.categoryId,
    // };
    // console.log(this.movieForm.value);
    this.movieService.createMovie(this.movieForm.value).subscribe((data) => {
      console.log(data, 'data');
      this.router.navigate(['/movies']);
    });
  }

  // log(value: NgModel) {
  //   console.log(value);
  // }
}

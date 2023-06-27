import { Movie } from './movie.model';

export class MovieRepository {
  private movies: Movie[];

  constructor() {
    this.movies = [
      {
        id: 1,
        title: 'film 1',
        description: 'film1 aciklama',
        imageUrl: '1.jpeg',
        isPopuler: true,
        datePublished: new Date(1990, 10, 10),
      },
      {
        id: 2,
        title: 'film 2',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dicta vitae dignissimos magni asperiores pariatur veniam cupiditate possimus tenetur similique voluptate tempore quam magnam at labore, quasi blanditiis officia rem?',
        imageUrl: '2.jpeg',
        isPopuler: false,
        datePublished: new Date(1990, 10, 10),
      },
      {
        id: 3,
        title: 'film 3',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dicta vitae dignissimos magni asperiores pariatur veniam cupiditate possimus tenetur similique voluptate tempore quam magnam at labore, quasi blanditiis officia rem?',
        imageUrl: '3.jpeg',
        isPopuler: true,
        datePublished: new Date(1990, 10, 10),
      },
      {
        id: 4,
        title: 'film 4',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dicta vitae dignissimos magni asperiores pariatur veniam cupiditate possimus tenetur similique voluptate tempore quam magnam at labore, quasi blanditiis officia rem?',
        imageUrl: '4.jpeg',
        isPopuler: false,
        datePublished: new Date(1990, 10, 10),
      },
      {
        id: 5,
        title: 'film 5',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dicta vitae dignissimos magni asperiores pariatur veniam cupiditate possimus tenetur similique voluptate tempore quam magnam at labore, quasi blanditiis officia rem?',
        imageUrl: '5.jpeg',
        isPopuler: true,
        datePublished: new Date(1990, 10, 10),
      },
    ];
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  getPopulerMovies(): Movie[] {
    return this.movies.filter((i) => i.isPopuler);
  }

  getMovieById(id: number): Movie {
    return this.movies.find((i) => i.id == id);
  }
}

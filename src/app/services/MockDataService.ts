import { Injectable } from '@angular/core';
import IMovieService from './IMovieService';
import { Subject } from 'rxjs';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MockDataService implements IMovieService {
  constructor() {}
  movies: Movie[] = [
    {
      name: 'Star Wars',
      year: 2020,
      imageUrl: '...',
      description: '',
      price: 120,
      id: 1,
      productCategory: [
        {
          categoryId: 5,
        },
      ],
    },
    {
      name: 'LOTR',
      year: 2008,
      imageUrl: '...',
      description: '',
      price: 240,
      id: 2,
      productCategory: [
        {
          categoryId: 5,
        },
      ],
    },
    {
      name: 'Harry Potter',
      year: 1998,
      imageUrl: '...',
      description: '',
      price: 520,
      id: 3,
      productCategory: [
        {
          categoryId: 5,
        },
      ],
    },
  ];

  theMovies: Subject<Movie[]> = new Subject<Movie[]>();

  getMovies(): void {
    this.theMovies.next(this.movies);
  }
}

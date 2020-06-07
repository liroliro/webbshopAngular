import { Injectable } from '@angular/core';
import IMovieService from './IMovieService';
import { Subject } from 'rxjs';
import { Movie } from '../models/Movie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService implements IMovieService {
  constructor(private http: HttpClient) {}

  theMovies = new Subject<Movie[]>();
  theMovie = new Subject<Movie>();
  cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];

  getMovies(): void {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products'
      )
      .subscribe((data: Movie[]) => {
        data.map((m) => {
          m.quantity = 1;
        });
        this.theMovies.next(data);
      });
  }

  getMovie(id: number) {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products/' +
          id
      )
      .subscribe((data: any) => {
        data.quantity = 1;
        this.theMovie.next(data);
      });
  }

  getCart() {
    const cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
  }

  addToCart(m) {
    this.cart.push(m);
    window.alert('Your movie has been added.');
  }

  getItemsinCart() {
    return this.cart;
  }

  clearCart() {
    localStorage.setItem('cart', '[]');
  }
}

import { Injectable } from '@angular/core';
import IMovieService from './IMovieService';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class DataService implements IMovieService {
  constructor() {}

  cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];

  addToCart(m: Movie) {
    this.cart.push(m);
  }

  clearCart() {
    localStorage.setItem('cart', '[]');
  }
}

import { Injectable } from '@angular/core';
import IMovieService from './IMovieService';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MockDataService implements IMovieService {
  constructor() {}

  cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];

  addToCart(m: Movie): void {
    this.cart.push(m);
  }

  clearCart(): void {
    this.cart = [];
  }
}

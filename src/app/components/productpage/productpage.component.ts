import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Movie } from 'src/app/models/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss'],
})
export class ProductpageComponent implements OnInit {
  movies: Movie[] = [];

  cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];

  constructor(private service: DataService, private route: Router) {}

  ngOnInit(): void {
    this.service.theMovies.subscribe((moviesFromApi) => {
      this.movies = moviesFromApi;
    });
    this.service.getMovies();
  }

  addToCart(m: Movie) {
    const foundItem = this.cart.find((movie) => movie.id === m.id);
    if (foundItem) {
      m.amount++;
      window.alert('Movie already exists, quantity++');
    } else {
      this.service.addToCart(m);
      this.cart.push(m);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  goToProduct(movie: Movie) {
    this.route.navigate(['/products', movie.id]);
  }
}

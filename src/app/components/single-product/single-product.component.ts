import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  id: number;
  movies: Movie;
  currentMovie: Movie;
  gotMovie: boolean = false;

  cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];

  constructor(private route: ActivatedRoute, private service: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;

      this.service.theMovie.subscribe((m: Movie) => {
        this.currentMovie = m;
        this.gotMovie = true;
      });

      this.service.getMovie(this.id);
    });
  }

  addToCart(m: Movie) {
    const foundItem = this.cart.find((movie) => movie.id == m.id);
    if (foundItem) {
      m.quantity++;
      window.alert('Movie already exists, quantity++');
    } else {
      this.service.addToCart(m);
      this.cart.push(m);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}

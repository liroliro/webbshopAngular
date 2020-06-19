import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Movie } from 'src/app/models/Movie';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss'],
})
export class ProductpageComponent implements OnInit {
  movies: Movie[] = [];

  cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];

  constructor(
    private service: DataService,
    private route: Router,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.httpService.theMovies.subscribe((moviesFromApi) => {
      this.movies = moviesFromApi.filter((m) => {
        if (m.name === null && m.imageUrl === null) {
          return;
        }

        return m;
      });
    });

    this.httpService.getMovies();
  }

  addToCart(m: Movie) {
    const foundItem = this.cart.find((movie) => movie.id === m.id);
    if (foundItem) {
      m.amount++;
    } else {
      this.service.addToCart(m);
      this.cart.push(m);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  goToProduct(movie: Movie) {
    this.route.navigate(['/products', movie.id]);
  }

  imageNotFound(event: any) {
    event.target.src = '../../assets/ImageNotFound.png';
  }
}

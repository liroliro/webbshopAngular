import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Movie } from 'src/app/models/Movie';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  movies: Movie[] = [];
  categories;
  movieControl = false;
  actionMovies: Movie[];
  thrillerMovies: Movie[];
  comedyMovies: Movie[];
  sciFiMovies: Movie[];

  constructor(
    private service: DataService,
    private route: Router,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.httpService.theCategories.subscribe((category) => {
      this.categories = category;
    });
    this.httpService.getCategories();

    this.service.theMovies.subscribe((moviesFromApi) => {
      this.movies = moviesFromApi;
      this.sortMovies();
    });
    this.service.getMovies();
  }

  goToProduct(movie: Movie) {
    this.route.navigate(['/products', movie.id]);
  }

  sortMovies() {
    this.movieControl = true;

    this.actionMovies = this.movies.filter((m) => {
      for (let i = 0; i < m.productCategory.length; i++) {
        const a = m.productCategory[i].categoryId;
        if (a == this.categories[0].id) {
          return m;
        } else {
          return;
        }
      }
    });

    // console.log(this.actionMovies);

    this.thrillerMovies = this.movies.filter((m) => {
      for (let i = 0; i < m.productCategory.length; i++) {
        const a = m.productCategory[i].categoryId;
        if (a == this.categories[1].id) {
          return m;
        } else {
          return;
        }
      }
    });

    // console.log(this.thrillerMovies);

    this.comedyMovies = this.movies.filter((m) => {
      for (let i = 0; i < m.productCategory.length; i++) {
        const a = m.productCategory[i].categoryId;
        if (a == this.categories[2].id) {
          return m;
        } else {
          return;
        }
      }
    });

    // console.log(this.comedyMovies);

    this.sciFiMovies = this.movies.filter((m) => {
      for (let i = 0; i < m.productCategory.length; i++) {
        const a = m.productCategory[i].categoryId;
        if (a == this.categories[3].id) {
          return m;
        } else {
          return;
        }
      }
    });

    // console.log(this.sciFiMovies);
  }
}

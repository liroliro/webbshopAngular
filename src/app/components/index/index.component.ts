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

  constructor(
    private service: DataService,
    private route: Router,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.httpService.theCategories.subscribe((category) => {
      console.log(category);
      this.categories = category;
    });
    this.httpService.getCategories();

    this.service.theMovies.subscribe((moviesFromApi) => {
      this.movies = moviesFromApi;
    });
    this.service.getMovies();
  }

  goToProduct(movie) {
    this.route.navigate(['/products', movie.id]);
  }

  sortMovies() {
    console.log(this.movies);
    // console.log(this.movies[0].productCategory[0].categoryId);
    let hej = this.movies.filter((m) => {
      let a;
      for (let i = 0; i < m.productCategory.length; i++) {
        a = m.productCategory[i].categoryId;

        if (a == this.categories[0].id) {
          console.log('ACTION');
        }

        if (a == this.categories[1].id) {
          console.log('THRILLER');
        }

        if (a == this.categories[2].id) {
          console.log('COMEDY');
        }
        if (a == this.categories[3].id) {
          console.log('SCI-FI');
        }
      }

      if (a == undefined) {
        return;
      } else {
        // console.log(a);
      }
      // return m;
    });
    // console.log(hej);
  }
}

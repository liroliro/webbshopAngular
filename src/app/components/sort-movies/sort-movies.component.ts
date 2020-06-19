import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Movie } from 'src/app/models/Movie';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-sort-movies',
  templateUrl: './sort-movies.component.html',
  styleUrls: ['./sort-movies.component.scss'],
})
export class SortMoviesComponent implements OnInit {
  @ViewChild('actionContent', { read: ElementRef })
  public actionContent: ElementRef<any>;
  @ViewChild('thrillerContent', { read: ElementRef })
  public thrillerContent: ElementRef<any>;
  @ViewChild('comedyContent', { read: ElementRef })
  public comedyContent: ElementRef<any>;
  @ViewChild('sciFiContent', { read: ElementRef })
  public sciFiContent: ElementRef<any>;

  movieControl = false;
  actionLogic = false;
  thrillerLogic = false;
  comedyLogic = false;
  sciFiLogic = false;
  actionMovies: Movie[];
  thrillerMovies: Movie[];
  comedyMovies: Movie[];
  sciFiMovies: Movie[];
  movies: Movie[] = [];
  categories: Category[] = [];

  gotMovies = false;
  gotCategories = false;

  constructor(private httpService: HttpService, private route: Router) {}

  ngOnInit(): void {
    this.httpService.theMovies.subscribe((moviesFromApi) => {
      this.movies = moviesFromApi;

      // This is used to remove error caught by trying to sorting movies and categories together, since they are on two different requests.
      this.gotMovies = true;
      this.start();
    });
    this.httpService.getMovies();

    this.httpService.theCategories.subscribe((category) => {
      this.categories = category;

      // This is used to remove error caught by trying to sorting movies and categories together, since they are on two different requests.
      this.gotCategories = true;
      this.start();
    });
    this.httpService.getCategories();
  }

  start() {
    if (this.gotMovies && this.gotCategories == true) {
      this.sortMovies();
    }
  }

  goToProduct(movie: Movie) {
    this.route.navigate(['/products', movie.id]);
  }

  sortMovies() {
    this.movieControl = true;

    let action: any;
    let thriller: any;
    let sciFi: any;
    let comedy: any;

    this.categories.forEach((c) => {
      if (c.name == 'Action') {
        return (action = c);
      }
      if (c.name == 'Thriller') {
        return (thriller = c);
      }
      if (c.name == 'Comedy') {
        return (comedy = c);
      }
      if (c.name == 'Sci-fi') {
        return (sciFi = c);
      }
    });

    this.actionMovies = this.movies.filter((m) => {
      for (let i = 0; i < m.productCategory.length; i++) {
        if (m.productCategory[i].categoryId == action.id) {
          return m;
        }
      }
    });

    this.thrillerMovies = this.movies.filter((m) => {
      for (let i = 0; i < m.productCategory.length; i++) {
        if (m.productCategory[i].categoryId == thriller.id) {
          return m;
        }
      }
    });

    this.comedyMovies = this.movies.filter((m) => {
      for (let i = 0; i < m.productCategory.length; i++) {
        if (m.productCategory[i].categoryId == comedy.id) {
          return m;
        }
      }
    });

    this.sciFiMovies = this.movies.filter((m) => {
      for (let i = 0; i < m.productCategory.length; i++) {
        if (m.productCategory[i].categoryId == sciFi.id) {
          return m;
        }
      }
    });
  }

  scrollRightAction(): void {
    this.actionLogic = true;
    this.actionContent.nativeElement.scrollTo({
      left: this.actionContent.nativeElement.scrollLeft + 300,
      behavior: 'smooth',
    });
  }

  scrollLeftAction(): void {
    this.actionContent.nativeElement.scrollTo({
      left: this.actionContent.nativeElement.scrollLeft - 300,
      behavior: 'smooth',
    });
  }

  scrollRightThriller(): void {
    this.thrillerLogic = true;
    this.thrillerContent.nativeElement.scrollTo({
      left: this.thrillerContent.nativeElement.scrollLeft + 300,
      behavior: 'smooth',
    });
  }

  scrollLeftThriller(): void {
    this.thrillerContent.nativeElement.scrollTo({
      left: this.thrillerContent.nativeElement.scrollLeft - 300,
      behavior: 'smooth',
    });
  }

  scrollRightComedy(): void {
    this.comedyLogic = true;
    this.comedyContent.nativeElement.scrollTo({
      left: this.comedyContent.nativeElement.scrollLeft + 300,
      behavior: 'smooth',
    });
  }

  scrollLeftComedy(): void {
    this.comedyContent.nativeElement.scrollTo({
      left: this.comedyContent.nativeElement.scrollLeft - 300,
      behavior: 'smooth',
    });
  }

  scrollRightSciFi(): void {
    this.sciFiLogic = true;
    this.sciFiContent.nativeElement.scrollTo({
      left: this.sciFiContent.nativeElement.scrollLeft + 300,
      behavior: 'smooth',
    });
  }

  scrollLeftSciFi(): void {
    this.sciFiContent.nativeElement.scrollTo({
      left: this.sciFiContent.nativeElement.scrollLeft - 300,
      behavior: 'smooth',
    });
  }
}

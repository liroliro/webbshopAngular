import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable, Subject } from 'rxjs';
import { Movie } from 'src/app/models/Movie';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  movieSearch: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.movieSearch = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.httpService.searchMovies(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}

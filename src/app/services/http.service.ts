import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { DatePipe } from '@angular/common';
import { Subject, Observable, of } from 'rxjs';
import { Movie } from '../models/Movie';
import IHttpService from './IHttpService';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class HttpService implements IHttpService {
  theCategories = new Subject<Category[]>();
  theOrders = new Subject<Order[]>();
  theMovies = new Subject<Movie[]>();
  theMovie = new Subject<Movie>();
  todaysDate: string;

  constructor(private http: HttpClient, datePipe: DatePipe) {
    // Special formatting to fit api
    this.todaysDate = datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ss');
  }

  // get for all movies
  getMovies(): void {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products'
      )
      .subscribe((data: Movie[]) => {
        data.map((m) => {
          m.amount = 1;
        });
        this.theMovies.next(data);
      });
  }

  // get for a specific movie
  getMovie(id: number) {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products/' +
          id
      )
      .subscribe((data: any) => {
        data.amount = 1;
        this.theMovie.next(data);
      });
  }

  // post-req from checkout
  sendOrder(order: Order) {
    const url =
      'https://medieinstitutet-wie-products.azurewebsites.net/api/orders';

    this.http
      .post<Order>(url, {
        companyId: order.companyId,
        created: this.todaysDate,
        createdBy: `${order.firstName} ${order.lastName}`,
        orderRows: order.products,
        paymentMethod: order.paymentMethod,
        totalPrice: order.totalPrice,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  // get for all categories
  getCategories() {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/categories'
      )
      .subscribe((data: Category[]) => {
        this.theCategories.next(data);
      });
  }

  // get for all orders
  getOrders() {
    const url = `https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=1337`;
    this.http.get(url).subscribe((data: Order[]) => {
      this.theOrders.next(data);
    });
  }

  // delete for a specific order
  deleteOrder(id: number) {
    const url = `https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${id}`;
    this.http.delete(url).subscribe((data) => {
      console.log(data);
    });
  }

  // search for multiple or specific movies. uses string from input
  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url =
      'https://medieinstitutet-wie-products.azurewebsites.net/api/search';
    return this.http.get<Movie[]>(`${url}?=${term}`).pipe();
  }
}

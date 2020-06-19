import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { DatePipe } from '@angular/common';
import { Subject, Observable, of } from 'rxjs';
import { Movie } from '../models/Movie';
import { tap } from 'rxjs/operators';
import IHttpService from './IHttpService';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class MockHttpService implements IHttpService {
  theMovies = new Subject<Movie[]>();
  theCategories = new Subject<Category[]>();
  theOrders = new Subject<Order[]>();
  theMovie = new Subject<Movie>();
  todaysDate: string;

  constructor(private http: HttpClient, datePipe: DatePipe) {
    this.todaysDate = datePipe.transform(Date.now(), 'yyyy-MM-ddThh:mm:ss');
  }

  movies: Movie[] = [
    {
      name: 'Star Wars',
      year: 2020,
      imageUrl: '...',
      description: '',
      price: 120,
      id: 1,
      amount: 23,
      productCategory: [
        {
          categoryId: 5,
          category: null,
        },
      ],
    },
    {
      name: 'LOTR',
      year: 2008,
      imageUrl: '...',
      description: '',
      price: 240,
      id: 2,
      amount: 3,
      productCategory: [
        {
          categoryId: 5,
          category: null,
        },
      ],
    },
    {
      name: 'Harry Potter',
      year: 1998,
      imageUrl: '...',
      description: '',
      price: 520,
      id: 3,
      amount: 1,
      productCategory: [
        {
          categoryId: 2,
          category: null,
        },
      ],
    },
  ];

  getMovies(): void {
    this.theMovies.next(this.movies);
  }

  movie: Movie = {
    id: 1,
    name: 'Return of the King',
    description: 'Lorem ipsum',
    price: 129,
    imageUrl: 'http://www.google.com',
    year: 2003,
    amount: 1,
    productCategory: [
      {
        categoryId: 5,
        category: null,
      },
    ],
  };

  getMovie() {
    this.theMovie.next(this.movie);
  }

  mockOrder: Order = {
    id: 256,
    companyId: 1337,
    firstName: 'Liro',
    lastName: 'Mattsson',
    paymentMethod: 'Visa',
    totalPrice: 1024,
    products: [
      {
        productId: 12,
        amount: 2,
      },
      {
        productId: 24,
        amount: 5,
      },
    ],
  };

  sendOrder(order: Order) {}

  categories: Category[] = [
    {
      id: 2,
      name: 'Action',
    },
    {
      id: 5,
      name: 'Scary',
    },
  ];

  getCategories() {
    this.theCategories.next(this.categories);
  }

  order: Order[] = [
    {
      id: 1,
      companyId: 1337,
      firstName: 'Oscar',
      lastName: 'Mattsson',
      paymentMethod: 'MasterCard',
      totalPrice: 1312,
      products: [
        {
          productId: 76,
          amount: 2,
        },
      ],
    },
    {
      id: 30,
      companyId: 1337,
      firstName: 'Oscario',
      lastName: 'Mattssoszn',
      paymentMethod: 'Visa',
      totalPrice: 131232,
      products: [
        {
          productId: 12,
          amount: 3,
        },
        {
          productId: 32,
          amount: 5,
        },
      ],
    },
  ];

  getOrders() {
    this.theOrders.next(this.order);
  }

  deleteOrder(id: number) {
    this.order.filter((order) => {
      if (order.id == id) {
        return;
      } else {
        return this.order;
      }
    });
  }

  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url =
      'https://medieinstitutet-wie-products.azurewebsites.net/api/search';
    return this.http.get<Movie[]>(`${url}?=${term}`).pipe();
  }
}

import { Subject, Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { Order } from '../models/Order';
import { Category } from '../models/Category';

export default interface IHttpService {
  theCategories: Subject<Category[]>;
  theOrders: Subject<Order[]>;
  theMovie: Subject<Movie>;
  theMovies: Subject<Movie[]>;
  todaysDate: string;

  getMovies(): void;
  getMovies(id: number): void;
  sendOrder(order: Order): void;
  getCategories(): void;
  getOrders(): void;
  deleteOrder(id: number): void;
  searchMovies(term: string): Observable<Movie[]>;
}

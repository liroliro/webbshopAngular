import { Subject } from 'rxjs';
import { Movie } from '../models/Movie';

export default interface IMovieService {
  theMovies: Subject<Movie[]>;

  getMovies(): void;
}

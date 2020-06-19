import { Movie } from '../models/Movie';

export default interface IMovieService {
  addToCart(m: Movie): void;
  clearCart(): void;
}

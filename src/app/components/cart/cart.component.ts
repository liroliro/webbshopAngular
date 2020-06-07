import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Movie } from 'src/app/models/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];
  totalPrice: number = 0;

  constructor(private service: DataService, private route: Router) {}

  ngOnInit(): void {
    this.cart = this.service.getItemsinCart();
    this.calcTotalPrice();
  }

  calcTotalPrice() {
    let calcPrice = 0;
    this.cart.forEach((e) => {
      calcPrice += e.quantity * e.price;
    });
    this.totalPrice = calcPrice;
  }

  clearCart() {
    this.service.clearCart();
    location.reload();
  }

  decreaseInCart(m: Movie) {
    const foundItem = this.cart.find((movie) => movie.id == m.id);
    foundItem.quantity--;

    if (foundItem.quantity == 0) {
      const filteredItems = this.cart.filter((m) => {
        if (m.quantity >= 1) {
          return m;
        }
      });
      this.cart = filteredItems;
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calcTotalPrice();
  }

  increaseInCart(m: Movie) {
    const foundItem = this.cart.find((movie) => movie.id == m.id);
    foundItem.quantity++;

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calcTotalPrice();
  }

  goToCheckout() {
    this.route.navigate(['/checkout']);
  }
}

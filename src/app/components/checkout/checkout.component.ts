import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Order } from 'src/app/models/Order';
import { Movie } from 'src/app/models/Movie';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];
  totalPrice = 0;
  products: Movie[] = [];

  customer = this.fb.group({
    firstName: [''],
    lastName: [''],
    paymentMethod: [''],
    address: this.fb.group({
      street: [''],
      zip: [''],
      city: [''],
    }),
  });
  constructor(private fb: FormBuilder, private service: HttpService) {}

  ngOnInit(): void {
    this.calcTotalPrice();
  }

  calcTotalPrice() {
    let calcPrice = 0;
    this.cart.forEach((e) => {
      calcPrice += e.amount * e.price;
    });
    this.totalPrice = calcPrice;
  }

  save() {
    const newOrder = new Order();
    const no = this.customer.value;
    newOrder.firstName = no.firstName;
    newOrder.lastName = no.lastName;
    newOrder.paymentMethod = no.paymentMethod;
    newOrder.totalPrice = this.totalPrice;
    newOrder.products = [];
    const products = this.cart.map((m) => {
      return {
        productId: m.id,
        amount: m.amount,
      };
    });

    products.forEach((product) => {
      newOrder.products.push(product);
    });

    this.service.sendOrder(newOrder);
  }
}

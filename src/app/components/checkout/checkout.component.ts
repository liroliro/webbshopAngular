import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Order } from 'src/app/models/Order';
import { Movie } from 'src/app/models/Movie';
import { HttpService } from 'src/app/services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: Movie[] = JSON.parse(localStorage.getItem('cart')) || [];
  totalPrice: number = 0;
  products: Movie[] = [];
  datei;

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
      calcPrice += e.quantity * e.price;
    });
    this.totalPrice = calcPrice;
  }

  save() {
    let newOrder = new Order();
    let no = this.customer.value;
    newOrder.firstName = no.firstName;
    newOrder.lastName = no.lastName;
    newOrder.id = this.randomOrderNumber(256, 1024);
    newOrder.paymentMethod = no.paymentMethod;
    newOrder.totalPrice = this.totalPrice;
    newOrder.products = [{ id: 1, quantity: 1 }];

    this.cart.map((m) => {
      newOrder.products.push(m);
    });

    this.service.sendOrder(newOrder);
  }

  randomOrderNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}

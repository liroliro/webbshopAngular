import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  theCategories = new Subject();
  theOrders = new Subject();
  todaysDate: string;

  constructor(private http: HttpClient, datePipe: DatePipe) {
    this.todaysDate = datePipe.transform(Date.now(), 'yyyy-MM-ddThh:mm:ss');
  }

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

  getCategories() {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/categories'
      )
      .subscribe((data) => {
        this.theCategories.next(data);
      });
  }

  getOrders() {
    const url = `https://medieinstitutet-wie-products.azurewebsites.net/api/orders`;
    this.http.get(url).subscribe((data) => {
      this.theOrders.next(data);
    });
  }

  deleteOrder(id: number) {
    const url = `https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${id}`;
    this.http.delete(url).subscribe((data) => {
      console.log(data);
    });
  }
}

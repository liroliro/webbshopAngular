import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  orders: Order[];
  constructor(private service: HttpService) {}

  ngOnInit(): void {
    this.service.theOrders.subscribe((order) => {
      this.orders = order;
    });

    this.service.getOrders();
  }

  removeOrder(id: number) {
    this.service.deleteOrder(id);

    let newOrder = this.orders.filter((m: any) => {
      if (m.id != id) {
        return m;
      } else {
        return;
      }
    });

    this.orders = newOrder;
  }
}

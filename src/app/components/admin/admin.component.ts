import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  orders;
  constructor(private service: HttpService) {}

  ngOnInit(): void {
    this.service.theOrders.subscribe((order) => {
      this.orders = order;
    });

    this.service.getOrders();
  }

  removeOrder(id: number) {
    this.service.deleteOrder(id);
    location.reload();
  }
}

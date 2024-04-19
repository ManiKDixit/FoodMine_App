import { Component, OnInit } from '@angular/core';

import { OrderService } from '../services/order.service';
import { Order } from '../shared/models/Order';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderItemsListComponent } from '../order-items-list/order-items-list.component';
import { TitleComponent } from '../components/partials/title/title.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [FormsModule , CommonModule , RouterModule , OrderItemsListComponent , TitleComponent , MapComponent ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {

  order:Order = new Order();
  constructor(orderService: OrderService, router: Router) {
      orderService.getNewOrderForCurrentUser().subscribe({
        next: (order: Order) => {
          this.order = order;
        },
        error:() => {
          router.navigateByUrl('/checkout');
        }
      })

   }

  ngOnInit(): void {
  }

}
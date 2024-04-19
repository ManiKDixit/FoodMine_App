 import { Component, OnInit } from '@angular/core';
import { CartService } from './../services/cart/cart.service';
import { Cart } from './../shared/models/Cart';
import { CartItem } from './../shared/models/CartItem';
import { TitleComponent } from '../components/partials/title/title.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
     selector: 'app-cart-page',
    standalone: true,
     imports: [CommonModule,RouterModule,NotFoundComponent,TitleComponent],
     templateUrl: './cart-page.component.html',
     styleUrl: './cart-page.component.css'
   })

   
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }

  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }

}

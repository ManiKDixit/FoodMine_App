import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';
import { LoadingComponent } from '../loading/loading.component';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule,LoadingComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  /**
   *
   */
  cartQuantity=0;
  user!:User
  constructor(private userService:UserService , cartService:CartService ) {
    
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })
    
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {
    
  }
  logout() {
    this.userService.logout()
  }

  get isAuth() {
    return this.user.token;
  }
}
  function ngOnInit(): ((error: any) => void) | null | undefined {
    throw new Error('Function not implemented.');
  }


import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/Order';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from '../components/partials/title/title.component';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../components/text-input/text-input.component';
import { OrderItemsListComponent } from '../order-items-list/order-items-list.component';
import { MapComponent } from '../map/map.component';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [TitleComponent,FormsModule,CommonModule , ReactiveFormsModule , TextInputComponent , OrderItemsListComponent , MapComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {

  order:Order = new Order();
  checkoutForm!: FormGroup;



  constructor(cartService:CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router : Router
  ) {

    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;

  }

  ngOnInit(): void {

    let {name , address} = this.userService.currentUser
    this.checkoutForm = this.formBuilder.group({
      name:[name,Validators.required],
      address:[address,Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }


  createOrder() {
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the inputs','Invalid Input')
      return;
    }

    if(!this.order.addressLatLng){
      this.toastrService.warning('Please select your location on the map' , 'Location');
      return;
    }

     // Access the value property of the form controls
  this.order.name = this.fc['name'].value;
  this.order.address = this.fc['address'].value;

  this.orderService.create(this.order).subscribe({
    next:() => {
      this.router.navigateByUrl('/payment');
    },
    error:(errorResponse) => {
      this.toastrService.error(errorResponse.error , 'Cart');
     
    }
  })

  }
}

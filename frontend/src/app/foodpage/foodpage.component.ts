import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/Food';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { StarRatingComponent } from '../components/partials/star-rating/star-rating.component';
import { TagsComponent } from '../tags/tags.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart/cart.service';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-foodpage',
  standalone: true,
  imports: [StarRatingComponent,TagsComponent,CommonModule,AppComponent,FormsModule,NotFoundComponent,RouterModule],
  templateUrl: './foodpage.component.html',
  styleUrl: './foodpage.component.css'
})
 

export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService,
    private cartService:CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params['id'])
      foodService.getFoodById(params['id']).subscribe(serverFood => {
        this.food = serverFood;
      });
    })
   }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}

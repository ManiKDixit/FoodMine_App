import { Component , OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { CommonModule } from '@angular/common'
import { Food } from '../shared/models/Food';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { StarRatingComponent } from '../components/partials/star-rating/star-rating.component';       
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { TagsComponent } from '../tags/tags.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,StarRatingComponent,SearchComponent,TagsComponent,RouterModule,NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent implements OnInit{

  foods:Food[] = [];
  constructor( foodService:FoodService , route:ActivatedRoute){
    let foodsObservable : Observable<Food[]>;
    //foodsObservable = this.foodService.getAll();
    route.params.subscribe((params) => {
        if(params['searchTerm']){
          foodsObservable = foodService.getAllFoodsBySearchTerm(params['searchTerm'])
        }
        else if(params['tag']){
          foodsObservable = foodService.getAllFoodsByTag(params['tag']);
          console.log(foodService.getAllFoodsByTag(params['tag']));
        }
        else {
          foodsObservable = foodService.getAll();
        }
        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
      
    })
    
  }


  

  ngOnInit() : void {
    // this.foods = this.foodService.getAll();
    // this.route.params.subscribe(params => {
    //   if(params['searchTerm']){
    //     this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm'])
    //   }
    //   else if(params['tag']){
    //     this.foods = this.foodService.getAllFoodsByTag(params['tag']);
    //   }
    //   else {
    //     this.foods = this.foodService.getAll();
    //   }
    // })

    
  }

}

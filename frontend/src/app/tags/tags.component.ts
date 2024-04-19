import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { RouterModule } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})



export class TagsComponent implements OnInit {
  tags?:Tag[];
  constructor(foodService:FoodService) {
    console.log("testing tag");
    foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
      
    });
   }

  ngOnInit(): void {
  }

}
import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { Tag } from '../../shared/models/Tag';
import { count } from 'console';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})



export class FoodService {

  constructor(private http:HttpClient) { }

  getAllTags() : Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getFoodById(id: string): Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + id)
  }

  getAllFoodsBySearchTerm(searchTerm:string): Observable<Food[]> {

   return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllFoodsByTag(tag:string): Observable<Food[]> {
    return tag == "All" ? this.getAll() : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
  }

  getAll(): Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }
}

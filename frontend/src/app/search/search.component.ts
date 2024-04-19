import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,AppComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
searchTerm = "";

constructor( route:ActivatedRoute , private router:Router){

  route.params.subscribe((params) => {
    if(params['searchTerm'])
    {
        this.searchTerm = params['searchTerm']
    }
  });
}



ngOnInit(): void {
  // this.route.params.subscribe(params => {
  //   this.searchTerm = params['searchTerm'];
  //})
}

search(term:string){
  if(term)
  {
    this.router.navigateByUrl('/search/'+ term);
  }
}


}





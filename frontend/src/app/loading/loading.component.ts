import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule,RouterModule,NotFoundComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {
isLoading!: boolean;

constructor(loadingService: LoadingService) {
  loadingService.isLoading.subscribe((isLoading) => {
this.isLoading = isLoading;
  })
  

}

ngOnInit(): void {
  
}
}

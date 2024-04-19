import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private pendingRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Show loading indicator
   //alert("Intercepting...")
   console.log('Intercepting....')
    this.loadingService.showLoading();
    this.pendingRequests++;

    // Handle the HTTP request
    return next.handle(req).pipe(
      tap({
        next:(event) => {
          if(event.type === HttpEventType.Response){
            this.handleHideLoading();
          }
        },
        error:(_) => {
          this.handleHideLoading();
        }
      })
    );
  }

  // Function to hide loading indicator
  private handleHideLoading() {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.loadingService.hideLoading();
    }
  }
}

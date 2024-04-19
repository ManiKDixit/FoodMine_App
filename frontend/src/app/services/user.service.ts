import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import {  ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User'
@Injectable({
  providedIn: 'root'
})
export class UserService {
private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable(); //userobservable is the read only version of userSubject
    
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful',
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }


  register(userRegister:IUserRegister) : Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Foodmine ${user.name}`,
            `Register Successful`
          )
        },
        error:(errorResponse) => {
          this.toastrService.error(errorResponse.error,'Registeration Failed')
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }



  private setUserToLocalStorage(user:User){
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_KEY , JSON.stringify(user));
    } else if (typeof sessionStorage !== 'undefined') {
      // Fallback to sessionStorage if localStorage is not supported
      sessionStorage.setItem(USER_KEY , JSON.stringify(user));
    } else {
      // If neither localStorage nor sessionStorage is supported
      console.log('Web Storage is not supported in this environment.');
    }
   // localStorage.setItem(USER_KEY , JSON.stringify(user));
  }


  private getUserFromLocalStorage():User{

    
    if (typeof localStorage !== 'undefined') {
      const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
      return new User();
    } else if (typeof sessionStorage !== 'undefined') {
      // Fallback to sessionStorage if localStorage is not supported
      const userJson = sessionStorage.getItem(USER_KEY);
      if(userJson) 
        return JSON.parse(userJson) as User;
      return new User();
    } else {
      // If neither localStorage nor sessionStorage is supported
      console.log('Web Storage is not supported in this environment.');
    }

    // const userJson = localStorage.getItem(USER_KEY);
     return new User();     
  }
}

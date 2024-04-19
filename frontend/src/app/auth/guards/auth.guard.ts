// import { CanActivateFn } from '@angular/router';


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userService = inject(UserService);

  if (userService.currentUser.token) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
  return false;
};
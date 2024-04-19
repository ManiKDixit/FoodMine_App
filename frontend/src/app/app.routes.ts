import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './foodpage/foodpage.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './payment-page/payment-page.component';
export const routes: Routes = [
    {path:'' , component:HomeComponent},
    {path:'search/:searchTerm', component:HomeComponent},
    {path:'tag/:tag', component:HomeComponent},
    {path:'food/:id' , component:FoodPageComponent},
    {path:'cart-page', component: CartPageComponent},
    {path:'login', component: LoginPageComponent},
    {path:'register', component: RegisterPageComponent},
    {path:'checkout', component: CheckoutPageComponent , canActivate:[authGuard]},
    {path:'payment', component: PaymentPageComponent , canActivate:[authGuard]}

];

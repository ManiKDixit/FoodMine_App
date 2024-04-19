import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from '../components/partials/title/title.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { InputContainerComponent } from "../components/input-container/input-container.component";
import { InputValidationComponent } from "../components/input-validation/input-validation.component";
import { TextInputComponent } from "../components/text-input/text-input.component";
import { DefaultButtonComponent } from "../components/default-button/default-button.component"; // Updated import

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [ReactiveFormsModule, TitleComponent, CommonModule, RouterModule, InputContainerComponent, InputValidationComponent, TextInputComponent, DefaultButtonComponent]
})
export class LoginPageComponent implements OnInit {


  loginForm! :FormGroup;
  isSubmitted = false;
  returnUrl = '';

  /**
   *
   */
  constructor(private formBuilder: FormBuilder
    , private userService:UserService,
     private activatedRoute:ActivatedRoute,
     private router: Router) { } // Updated injection of Router

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({email: this.fc['email'].value , password: this.fc['password'].value}).subscribe(() => {
         this.router.navigateByUrl(this.returnUrl); // Changed to navigate method
       });
   }
}

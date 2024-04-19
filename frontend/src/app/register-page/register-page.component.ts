import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../components/partials/title/title.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Updated import
import { PasswordsMatchValidator } from '../shared/validators/password_match_validator';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from '../components/default-button/default-button.component';
import { InputContainerComponent } from '../components/input-container/input-container.component';
import { InputValidationComponent } from '../components/input-validation/input-validation.component';
import { TextInputComponent } from '../components/text-input/text-input.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [TitleComponent ,ReactiveFormsModule,  CommonModule, InputContainerComponent, InputValidationComponent, TextInputComponent, DefaultButtonComponent,RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {

  registerForm ! :FormGroup;
  isSubmitted = false;

  returnUrl = ''
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['',[Validators.required , Validators.minLength(5)]],
      email:['' , [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(5)]],
      confirmPassword:['',Validators.required],
      address:['',[Validators.required,Validators.minLength(6)]]
    }, {
      validators: PasswordsMatchValidator('password','confirmPassword')
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;


    const fv = this.registerForm.value;
    const user :IUserRegister = {
      name: fv['name'],
      email: fv['email'],
      password: fv['password'],
      confirmPassword:fv['confirmPassword'],
      address: fv['address'],

    };

    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);77777777777
    })
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';
import { CommonEngine } from '@angular/ssr';

const VALIDATORS_MESSAGES:any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength:'Field is too short',
  notMatch:'Password and Confirm does not match'
}

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnInit , OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  @Input()
  control!:AbstractControl;

  @Input()
  showErrorsWhen:boolean = true;

  errorMessages:string[] = [];

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }
      const errorKeys = Object.keys(errors);
      this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
    
  }
}

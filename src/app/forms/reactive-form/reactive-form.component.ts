import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { distinctUntilChanged } from 'rxjs/operators';

import { NotifyMedium } from '../../models/customer-model';
import { numberLength } from '../custom-validators/delivery-form-validators';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  public deliveryForm: FormGroup;
  public emailControl: AbstractControl;
  public phoneControl: AbstractControl;
  public countryCodeControl: AbstractControl;
  public notifyMedium: typeof NotifyMedium = NotifyMedium;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.buildFormGroup();
    this.emailControl = this.getFormControl('email');
    this.phoneControl = this.getFormControl('phoneNumber');
    this.countryCodeControl = this.getFormControl('countryCode');
    this.countryCodeControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.showValidationMessage(this.countryCodeControl);
      });
  }

  public saveDeliveryForm(): void {
    console.log(this.deliveryForm.getRawValue());
    console.log("save succeeded");
  }

  public updatePackageTrace(event: any): void { 
    if(event?.target?.checked) { 
      this.updateNotifyMedium(this.deliveryForm.get('notifyMedium').value); 
    } else { 
      this.clearValidatorsForDeliveryForm(); 
      this.updateValidatorsForDeliveryForm();
    }
  }

  public updateNotifyMedium(notifyMedium: NotifyMedium): void {
    this.clearValidatorsForDeliveryForm();
    
    switch (notifyMedium) { 
      case NotifyMedium.PHONE: 
        this.setValidatorsForDeliveryForm(this.phoneControl, [Validators.required, Validators.minLength(5), Validators.maxLength(12)]); 
        break; 
      default: 
        this.setValidatorsForDeliveryForm(this.emailControl, [Validators.required, Validators.minLength(5), Validators.email]); 
        break; 
    } 
    
    this.updateValidatorsForDeliveryForm();
  }

  private buildFormGroup(): void {
    this.deliveryForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: '',
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      countryCode: ['', Validators.required],
      keepNotified: false,
      phoneNumber: '',
      notifyMedium: this.notifyMedium.EMAIL
    });
  }

  private getFormControl(name: string): AbstractControl {
    return this.deliveryForm.get(name);
  }

  private showValidationMessage(control: AbstractControl): void {
    if (control.touched || control.dirty) {
      this.clearValidatorForDeliveryForm(this.countryCodeControl);

      if (control.value && control.value !== '') {
        this.setValidatorsForDeliveryForm(this.countryCodeControl, [Validators.required, numberLength(2, 3)]);
      } else {
        this.setValidatorsForDeliveryForm(this.countryCodeControl, Validators.required);
      }
    }

    this.updateValidatorForDeliveryForm(this.countryCodeControl);
  }

  private clearValidatorsForDeliveryForm(): void {
    this.clearValidatorForDeliveryForm(this.emailControl);
    this.clearValidatorForDeliveryForm(this.phoneControl);
  }

  private clearValidatorForDeliveryForm(control: AbstractControl): void {
    control.clearValidators();
  }

  private setValidatorsForDeliveryForm(control: AbstractControl, newValidator: ValidatorFn|ValidatorFn[]): void { 
    control.setValidators(newValidator);
  }

  private updateValidatorsForDeliveryForm(): void { 
    this.updateValidatorForDeliveryForm(this.emailControl);
    this.updateValidatorForDeliveryForm(this.phoneControl);
  }

  private updateValidatorForDeliveryForm(control: AbstractControl): void { 
    control.updateValueAndValidity(); 
  }
}

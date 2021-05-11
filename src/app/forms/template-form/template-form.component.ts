import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from '../../models/customer-model';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {
  public customer: Customer = new Customer();

  constructor() { }

  ngOnInit(): void {
  }

  public saveDeliveryForm(form: NgForm): void {
    console.log(form);
    console.log("save succeeded");
  }
}

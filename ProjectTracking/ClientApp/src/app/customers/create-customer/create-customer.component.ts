import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formToFormData} from "../../../common/functions/formToFormData";

@Component({
  selector: 'app-create-customer',
  templateUrl: 'create-customer.component.html',
})
export class CreateCustomerComponent {

  readonly baseUrl: string = 'api/Customer'

  constructor(private http: HttpClient) {

  }

  createCustomer = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  })

  onSubmit(){
    this.http.post(`${this.baseUrl}`, {
        name: this.createCustomer.get('name')!.value
    })
      .subscribe({
        next: _ => window.history.back()
      })
  }
}

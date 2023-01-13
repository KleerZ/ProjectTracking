import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formToFormData} from "../../../common/functions/formToFormData";
import {ActivatedRoute} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {GetAllCustomersModel} from "../../../common/models/getAllCustomersModel";

@Component({
    selector: 'app-update-customer',
    templateUrl: 'update-customer.component.html',
})
export class UpdateCustomerComponent implements OnInit {

    readonly baseUrl: string = 'api/Customer';
    id!: number;
    updateCustomer!: FormGroup

    constructor(private http: HttpClient,
                private activatedRoute: ActivatedRoute) {

    }

    async ngOnInit(): Promise<void> {
        await this.getCustomer()
    }

    async getCustomer() {
        this.getIdFromRoute()
        this.http.get<GetAllCustomersModel>(`${this.baseUrl}/${this.id}`)
            .subscribe({
                next: async value => {
                    this.updateCustomer = new FormGroup({
                        id: new FormGroup(value.id),
                        name: new FormControl(value.name, [
                            Validators.required,
                            Validators.minLength(2),
                        ]),
                    })
                }
            })
    }

    getIdFromRoute() {
        this.activatedRoute.params.subscribe({
            next: value => this.id = value['id']
        })
    }

    onSubmit() {
        this.http.put(`${this.baseUrl}/${this.id}`, {id: this.id,
            name: this.updateCustomer.get('name')!.value})
            .subscribe({
                next: _ => window.history.back()
            })
    }
}

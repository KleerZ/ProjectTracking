import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GetAllCustomersModel} from "../../../common/models/getAllCustomersModel";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-create-project',
    templateUrl: 'create-project.component.html',
})
export class CreateProjectComponent implements OnInit {

    readonly baseUrl: string = 'api/Project'
    customers: any

    constructor(private http: HttpClient) {

    }

    async ngOnInit(): Promise<void> {
        this.customers = await firstValueFrom(this.http.get('api/Customer'))
    }

    createProject = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
        ]),
        deliveryDate: new FormControl('', [
            Validators.required
        ]),
        customer: new FormControl('', [
            Validators.required
        ])
    })

    onSubmit() {
        let name = this.createProject.get('name')!.value
        let status = "Not finished"
        let deliveryDate = this.createProject.get('deliveryDate')!.value
        let customer = this.createProject.get('customer')!.value
        this.http.post(`${this.baseUrl}/${customer}`, {
            name: name,
            status: status,
            deliveryDate: deliveryDate
        })
            .subscribe({
                next: _ => window.history.back()
            })
    }
}

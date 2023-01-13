import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formToFormData} from "../../../common/functions/formToFormData";
import {ActivatedRoute} from "@angular/router";
import {GetAllCustomersModel} from "../../../common/models/getAllCustomersModel";
import {GetAllEmployeesModel} from "../../../common/models/getAllEmloyeesModel";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-update-project',
    templateUrl: 'update-project.component.html',
})
export class UpdateProjectComponent {

    readonly baseUrl: string = 'api/Project';
    id!: number;
    updateProject!: FormGroup
    customers: any

    constructor(private http: HttpClient,
                private activatedRoute: ActivatedRoute) {

    }

    async ngOnInit(): Promise<void> {
        await this.getProject()
        this.customers = await firstValueFrom(this.http.get('api/Customer'))
    }

    async getProject() {
        this.getIdFromRoute()
        console.log(this.id)
        this.http.get<any>(`${this.baseUrl}/${this.id}`)
            .subscribe({
                next: async value => {
                    console.log(value)
                    this.updateProject = new FormGroup({
                        id: new FormGroup(value.id),
                        name: new FormControl(value.name, [
                            Validators.required,
                            Validators.minLength(2),
                        ]),
                        status: new FormControl(value.status, [
                            Validators.required,
                            Validators.minLength(2),
                        ]),
                        deliveryDate: new FormControl((<Date>value.deliveryDate), [
                            Validators.required,
                            Validators.minLength(2),
                        ]),
                        customer: new FormControl(value.customer.id, [
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
        let name = this.updateProject.get('name')!.value
        let status = this.updateProject.get('status')!.value
        let deliveryDate = this.updateProject.get('deliveryDate')!.value
        let customer = this.updateProject.get('customer')!.value
        this.http.put(`${this.baseUrl}/${this.id}/${customer}`, {
            id: this.id,
            name: name,
            status: status,
            deliveryDate: deliveryDate
        })
            .subscribe({
                next: _ => window.history.back()
            })
    }
}

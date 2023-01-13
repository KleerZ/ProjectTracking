import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formToFormData} from "../../../common/functions/formToFormData";
import {ActivatedRoute} from "@angular/router";
import {GetAllCustomersModel} from "../../../common/models/getAllCustomersModel";
import {GetAllEmployeesModel} from "../../../common/models/getAllEmloyeesModel";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-update-employee',
    templateUrl: 'update-employee.component.html',
})
export class UpdateEmployeeComponent {

    readonly baseUrl: string = 'api/Employee';
    id!: number;
    updateEmployee!: FormGroup
    projects: any
    selected: string[] = []

    constructor(private http: HttpClient,
                private activatedRoute: ActivatedRoute) {

    }

    async ngOnInit(): Promise<void> {
        await this.getEmployee()
        this.projects = await firstValueFrom(this.http.get('api/Project'))
    }

    async getEmployee() {
        this.getIdFromRoute()
        console.log(this.id)
        this.http.get<GetAllEmployeesModel>(`${this.baseUrl}/${this.id}`)
            .subscribe({
                next: async value => {
                    console.log(value)
                    this.updateEmployee = new FormGroup({
                        id: new FormGroup(value.id),
                        firstName: new FormControl(value.firstName, [
                            Validators.required,
                            Validators.minLength(2),
                        ]),
                        lastName: new FormControl(value.lastName, [
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
        this.http.put(`${this.baseUrl}/${this.id}`, {
            id: this.id,
            firstName: this.updateEmployee.get('firstName')!.value,
            lastName: this.updateEmployee.get('lastName')!.value,
            projects: this.selected
        })
            .subscribe({
                next: _ => window.history.back()
            })
    }

    onChange() {
        this.selected = []
        const checkboxes = <any>document.querySelectorAll('input[type=checkbox]');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                this.selected.push(checkboxes[i].value);
            }
        }
        console.log(this.selected)
    }
}

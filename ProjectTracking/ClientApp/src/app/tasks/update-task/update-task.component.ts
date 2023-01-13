import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formToFormData} from "../../../common/functions/formToFormData";
import {ActivatedRoute} from "@angular/router";
import {GetAllCustomersModel} from "../../../common/models/getAllCustomersModel";
import {GetAllEmployeesModel} from "../../../common/models/getAllEmloyeesModel";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-update-task',
    templateUrl: 'update-task.component.html',
})
export class UpdateTaskComponent {

    readonly baseUrl: string = 'api/ProjectTask';
    id!: number;
    updateTask!: FormGroup
    employees: any
    projects: any

    constructor(private http: HttpClient,
                private activatedRoute: ActivatedRoute) {

    }

    async ngOnInit(): Promise<void> {
        await this.getProject()
        this.employees = await firstValueFrom(this.http.get('api/Employee'))
        this.projects = await firstValueFrom(this.http.get('api/Project'))
    }

    async getProject() {
        this.getIdFromRoute()
        console.log(this.id)
        this.http.get<any>(`${this.baseUrl}/${this.id}`)
            .subscribe({
                next: async value => {
                    this.updateTask = new FormGroup({
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
                        employee: new FormControl(value.employee.id, [
                            Validators.required,
                            Validators.minLength(2),
                        ]),
                        project: new FormControl(value.project.id, [
                            Validators.required,
                            Validators.minLength(2),
                        ])
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
        let name = this.updateTask.get('name')!.value
        let status = this.updateTask.get('status')!.value
        let deliveryDate = this.updateTask.get('deliveryDate')!.value
        let project = this.updateTask.get('project')!.value
        let employee = this.updateTask.get('employee')!.value
        console.log(project)
        console.log(employee)
        this.http.put(`${this.baseUrl}/${this.id}/${employee}/${project}`, {
            id: this.id,
            name: name,
            status: status,
            deliveryDate: deliveryDate,
            employee: null,
            project: null
        })
            .subscribe({
                next: _ => window.history.back()
            })
    }
}

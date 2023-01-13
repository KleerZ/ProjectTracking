import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GetAllCustomersModel} from "../../../common/models/getAllCustomersModel";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-create-task',
    templateUrl: 'create-task.component.html',
})
export class CreateTaskComponent implements OnInit {

    readonly baseUrl: string = 'api/ProjectTask'
    employees: any
    projects: any

    constructor(private http: HttpClient) {

    }

    async ngOnInit(): Promise<void> {
        this.employees = await firstValueFrom(this.http.get('api/Employee'))
        this.projects = await firstValueFrom(this.http.get('api/Project'))
    }

    createProject = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
        ]),
        deliveryDate: new FormControl('', [
            Validators.required
        ]),
        employee: new FormControl('', [
            Validators.required
        ]),
        project:  new FormControl('', [
        Validators.required
        ])
    })

    onSubmit() {
        let name = this.createProject.get('name')!.value
        let status = "Not finished"
        let deliveryDate = this.createProject.get('deliveryDate')!.value
        let employee = this.createProject.get('employee')!.value
        let project = this.createProject.get('project')!.value
        console.log(employee)
        console.log(project)
        this.http.post(`${this.baseUrl}/${employee}/${project}`, {
            name: name,
            status: status,
            deliveryDate: deliveryDate
        })
            .subscribe({
                next: _ => window.history.back()
            })
    }
}

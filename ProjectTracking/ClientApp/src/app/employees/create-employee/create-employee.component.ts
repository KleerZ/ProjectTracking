import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-create-employee',
    templateUrl: 'create-employee.component.html',
})
export class CreateEmployeeComponent implements OnInit{

    readonly baseUrl: string = 'api/Employee'
    projects: any
    selected: string[] = []

    constructor(private http: HttpClient) {
    }

    createEmployee = new FormGroup({
        firstName: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
        ])
    })

    onSubmit() {
        let firstName = this.createEmployee.get('firstName')!.value
        let lastName = this.createEmployee.get('lastName')!.value
        console.log({firstName: firstName, lastName: lastName, projects: this.projects})
        this.http.post(`${this.baseUrl}`, {firstName: firstName, lastName: lastName, projects: this.selected})
            .subscribe({
                next: _ => window.history.back()
            })
    }

    async ngOnInit(): Promise<void> {
        this.projects = await firstValueFrom(this.http.get('api/Project'))
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

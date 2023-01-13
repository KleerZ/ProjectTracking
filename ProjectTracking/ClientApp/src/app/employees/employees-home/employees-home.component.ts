import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {GetAllEmployeesModel} from "../../../common/models/getAllEmloyeesModel";

@Component({
    selector: 'app-employees-home',
    templateUrl: 'employees-home.component.html',
})
export class EmployeesHomeComponent implements OnInit {
    readonly baseUrl: string = 'api/Employee'

    employees: GetAllEmployeesModel[] = []

    constructor(private http: HttpClient) {

    }

    async ngOnInit(): Promise<void> {
        await this.getAllEmployees()
    }

    filterForm = new FormGroup({
        filterType: new FormControl(),
        filterValue: new FormControl()
    })

    async getAllEmployees() {
        this.employees = await firstValueFrom(this.http.get<GetAllEmployeesModel[]>(`${this.baseUrl}`))
    }

    async deleteEmployee(employeeId: number) {
        await firstValueFrom(this.http.delete(`${this.baseUrl}/${employeeId}`))
        await this.getAllEmployees()
    }

    async resetFiltration() {
        await this.getAllEmployees()
        this.searchTerm = ''
    }

    updateFilter() {

    }

    searchTerm!: string;
    async search() {
        await this.getAllEmployees()
        this.employees = this.employees.filter((item) => {
            let match = false;
            Object.values(item).forEach((val) => {
                if(val.toString().toLowerCase().indexOf(this.searchTerm.trim().toLowerCase()) !== -1){
                    match = true;
                    return;
                }
            });
            return match;
        });
    }
}

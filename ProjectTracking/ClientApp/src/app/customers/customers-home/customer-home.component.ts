import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {GetAllCustomersModel} from "../../../common/models/getAllCustomersModel";
import {ColumnMode} from '@swimlane/ngx-datatable';
import {filterBy} from "@progress/kendo-data-query";

@Component({
    selector: 'app-customers-home',
    templateUrl: 'customer-home.component.html',
})
export class CustomerHomeComponent implements OnInit {
    readonly baseUrl: string = 'api/Customer'

    ColumnMode = ColumnMode
    customers: GetAllCustomersModel[] = []
    searchTerm!: string;

    constructor(private http: HttpClient) {

    }

    async ngOnInit(): Promise<void> {
        await this.getCustomers()
    }

    filterForm = new FormGroup({
        filterType: new FormControl(),
        filterValue: new FormControl()
    })

    async getCustomers() {
        this.customers = await firstValueFrom(this.http
            .get<GetAllCustomersModel[]>(`${this.baseUrl}`))
    }

    async deleteCustomer(id: number) {
        await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
        await this.getCustomers()
    }

    async resetFiltration() {
        await this.getCustomers()
        this.searchTerm = ''
    }

    async search() {
        await this.getCustomers()
        this.customers = this.customers.filter((item) => {
            return item.name.toLowerCase().indexOf(this.searchTerm.trim().toLowerCase()) !== -1;
        });
    }
}

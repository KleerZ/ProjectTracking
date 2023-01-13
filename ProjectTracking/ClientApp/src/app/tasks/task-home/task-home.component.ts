import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-projects-task',
    templateUrl: 'task-home.component.html',
})
export class TaskHomeComponent implements OnInit {
    readonly baseUrl: string = 'api/ProjectTask'

    tasks: any

    constructor(private http: HttpClient) {

    }

    async ngOnInit(): Promise<void> {
        await this.getAllProjects()
    }

    filterForm = new FormGroup({
        filterType: new FormControl(),
        filterValue: new FormControl()
    })

    async getAllProjects() {
        this.tasks = await firstValueFrom(this.http.get(`${this.baseUrl}`))
    }

    async deleteProject(employeeId: number) {
        await firstValueFrom(this.http.delete(`${this.baseUrl}/${employeeId}`))
        await this.getAllProjects()
    }

    async resetFiltration() {
        await this.getAllProjects()
    }

    updateFilter() {

    }

    async search() {
        await this.getAllProjects()

        let input, filter, table, tr, td, i, txtValue: any;
        input = document.getElementById("search") as any;
        filter = input.value.toUpperCase();
        table = document.querySelector("ngx-datatable") as any;
        tr = table.querySelectorAll("datatable-body-row");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].querySelectorAll(".datatable-body-cell-label");
            let isFound = false;

            for (let j = 0; j < 7; j++) {
                if (td[j]) {
                    txtValue = td[j].textContent || td[j].innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        isFound = true;
                    }
                }
            }

            tr[i].style.display = isFound ? '' : 'none';
        }
    }

    async finish(id: number) {
        await firstValueFrom(this.http.post(`${this.baseUrl}/finish/${id}`, {}))
        await this.getAllProjects()
    }
}

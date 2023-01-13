import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {EmployeesHomeComponent} from "./employees/employees-home/employees-home.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CreateEmployeeComponent} from "./employees/create-employee/create-employee.component";
import {UpdateEmployeeComponent} from "./employees/update-employee/update-employee.component";
import {CreateCustomerComponent} from "./customers/create-customer/create-customer.component";
import {UpdateCustomerComponent} from "./customers/update-customer/update-customer.component";
import {CustomerHomeComponent} from "./customers/customers-home/customer-home.component";
import {ProjectsHomeComponent} from "./projects/projects-home/projects-home.component";
import {CreateProjectComponent} from "./projects/create-project/create-project.component";
import {UpdateProjectComponent} from "./projects/update-project/update-project.component";
import {CreateTaskComponent} from "./tasks/create-task/create-task.component";
import {UpdateTaskComponent} from "./tasks/update-task/update-task.component";
import {TaskHomeComponent} from "./tasks/task-home/task-home.component";
import {ViewProjectComponent} from "./projects/view-project/view-project.component";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        EmployeesHomeComponent,
        CreateEmployeeComponent,
        UpdateEmployeeComponent,
        CreateCustomerComponent,
        UpdateCustomerComponent,
        CustomerHomeComponent,
        ProjectsHomeComponent,
        CreateProjectComponent,
        UpdateProjectComponent,
        CreateTaskComponent,
        UpdateTaskComponent,
        TaskHomeComponent,
        ViewProjectComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent, pathMatch: 'full'},
            {path: 'employees-home', component: EmployeesHomeComponent, pathMatch: 'full'},
            {path: 'create-employee', component: CreateEmployeeComponent, pathMatch: 'full'},
            {path: 'update-employee/:id', component: UpdateEmployeeComponent, pathMatch: 'full'},

            {path: 'customers-home', component: CustomerHomeComponent, pathMatch: 'full'},
            {path: 'create-customer', component: CreateCustomerComponent, pathMatch: 'full'},
            {path: 'update-customer/:id', component: UpdateCustomerComponent},

            {path: 'projects-home', component: ProjectsHomeComponent, pathMatch: 'full'},
            {path: 'create-project', component: CreateProjectComponent, pathMatch: 'full'},
            {path: 'update-project/:id', component: UpdateProjectComponent},
            {path: 'view-project/:id', component: ViewProjectComponent},

            {path: 'tasks-home', component: TaskHomeComponent, pathMatch: 'full'},
            {path: 'create-task', component: CreateTaskComponent, pathMatch: 'full'},
            {path: 'update-task/:id', component: UpdateTaskComponent},
        ]),
        NgxDatatableModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

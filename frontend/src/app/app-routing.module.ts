import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { CompanyComponent } from './views/company/company.component';
import { EmployeeComponent } from './views/employee/employee.component';

import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { CompanyCreateComponent } from './components/company/company-create/company-create.component';
import { EmployeeRemoveCompanyComponent } from './components/employee/employee-remove-company/employee-remove-company.component';
import { EmployeeAddCompanyComponent } from './components/employee/employee-add-company/employee-add-company.component';
import { CompanyAddEmployeeComponent } from './components/company/company-add-employee/company-add-employee.component';
import { CompanyRemoveEmployeeComponent } from './components/company/company-remove-employee/company-remove-employee.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'company/create',
    component: CompanyCreateComponent
  },
  {
    path: 'company/add-employee',
    component: CompanyAddEmployeeComponent
  },
  {
    path: 'company/remove-employee',
    component: CompanyRemoveEmployeeComponent
  },
  
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'employee/create',
    component: EmployeeCreateComponent
  },
  {
    path: 'employee/remove-company',
    component: EmployeeRemoveCompanyComponent
  },
  {
    path: 'employee/add-company',
    component: EmployeeAddCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CompanyEmployeeService } from './../../company-employee.service';
import { Router } from '@angular/router';
import { EmployeeService } from './../employee.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from './../employee.model';
import { Company } from './../../company/company.model';

@Component({
  selector: 'app-employee-read',
  templateUrl: './employee-read.component.html',
  styleUrls: ['./employee-read.component.css']
})
export class EmployeeReadComponent {

  public employee: Employee = {
    id: -1,
    cpf: '',
    companies: []
  }

  constructor(private employeeService: EmployeeService,
    private companyEmployeeService: CompanyEmployeeService,
    private router: Router) {}

  onSearch(): void {
    this.employeeService.read(this.employee.cpf).subscribe(employee => {
      this.employee = employee
      this.employee.show = true
    }, error => {
      this.employeeService.showSnackBar(error.error.message)
    })
  }

  onAddCompany(): void {
    this.companyEmployeeService.employee.cpf = this.employee.cpf
    this.router.navigate(['employee/add-company'])
  }

  onRemoveCompany(): void {
    this.companyEmployeeService.employee.cpf = this.employee.cpf
    this.router.navigate(['employee/remove-company'])
  }
}

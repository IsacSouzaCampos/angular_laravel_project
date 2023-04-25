import { Company } from '../../company/company.model';
import { EmployeeService } from './../employee.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-remove-company',
  templateUrl: './employee-remove-company.component.html',
  styleUrls: ['./employee-remove-company.component.css']
})
export class EmployeeRemoveCompanyComponent {

  public company: Company = {
    cnpj: ''
  }

  constructor(private employeeService: EmployeeService) {}

  onRemoveCompany(): void {
    this.employeeService.
  }
}

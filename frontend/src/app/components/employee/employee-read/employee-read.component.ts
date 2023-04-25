import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from './../employee.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-read',
  templateUrl: './employee-read.component.html',
  styleUrls: ['./employee-read.component.css']
})
export class EmployeeReadComponent {

  public employee: Employee = {
    cpf: '',
  }

  constructor(private employeeService: EmployeeService, 
    private router: Router) {}

  onSearch(): void {
    this.employeeService.read(this.employee.cpf).subscribe(employee => {
      // console.log(json)
      this.employee = employee
      this.employee.show = true
    }, error => {
      this.employeeService.showSnackBar(error.error.message)
    })
  }

  onRemoveCompany(): void {
    this.router.navigate(['/employee/remove-company'])
  }
}

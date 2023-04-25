import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

import { Employee } from './../employee.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  
  constructor(private router: Router, 
    private employeeService: EmployeeService) {}
  
  public employee: Employee = {
    cpf: '',
    name: '',
    location: '',
    email: '',
    login: '',
    password: ''
  }

  ngOnInit(): void { }

  onSave(): void {
    this.employeeService.create(this.employee).subscribe(() => {
      this.employeeService.showSnackBar('Funcionário cadastrado!')
      this.router.navigate(['employee'])
    }, error => {
      this.employeeService.showSnackBar(error.error.message)
    })
  }

  onCancel(): void {
    this.router.navigate(['employee'])
  }
}

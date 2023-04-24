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
  
  private employee: Employee = {
    cpf: '11111111111',
    name: 'Fulano da Silva',
    location: 'Rua do Fulano da Silva',
    email: 'fulano@gmail.com',
    login: 'fulano',
    password: 'senha-do-fulano'
  }

  ngOnInit(): void { }

  onSave(): void {
    this.employeeService.create(this.employee).subscribe(() => {
      this.employeeService.showSnackBar('Funcionário cadastrado!')
      this.router.navigate(['employee'])
    })
  }

  onCancel(): void {
    this.router.navigate(['employee'])
  }
}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void { }

  onSave(): void {
    this.employeeService.showSnackBar('Funcionário cadastrado!')
  }
}

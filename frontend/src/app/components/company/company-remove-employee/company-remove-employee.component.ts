import { Component } from '@angular/core';
import { Employee } from '../../employee/employee.model';
import { CompanyEmployeeService } from '../../company-employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-remove-employee',
  templateUrl: './company-remove-employee.component.html',
  styleUrls: ['./company-remove-employee.component.css']
})
export class CompanyRemoveEmployeeComponent {

  public employee: Employee = {
    cpf: ''
  }

  constructor(private companyEmployeeService: CompanyEmployeeService,
      private router: Router) {}

  onRemoveEmployee(): void {
    this.companyEmployeeService.employee.cpf = this.employee.cpf
    this.companyEmployeeService.remove().subscribe(() => {
      this.companyEmployeeService.showSnackBar('Vínculo removido com sucesso!')
      this.router.navigate(['company'])
    }, error => {
      this.companyEmployeeService.showSnackBar(error.message)
      this.router.navigate(['company'])
    })
  }

  onCancel(): void {
    this.router.navigate(['employee'])
  }
}

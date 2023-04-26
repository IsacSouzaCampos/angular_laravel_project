import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CompanyEmployeeService } from '../../company-employee.service';
import { Employee } from '../../employee/employee.model';

@Component({
  selector: 'app-company-add-employee',
  templateUrl: './company-add-employee.component.html',
  styleUrls: ['./company-add-employee.component.css']
})
export class CompanyAddEmployeeComponent {

  public employee: Employee = {
    cpf: ''
  }

  constructor(private companyEmployeeService: CompanyEmployeeService,
    private router: Router) {}
  
  onAddEmployee(): void {
    this.companyEmployeeService.employee.cpf = this.employee.cpf
    this.companyEmployeeService.create().subscribe(() => {
      this.companyEmployeeService.showSnackBar('Vínculo criado com sucesso!')
      this.router.navigate(['company'])
    }, () => {
      this.companyEmployeeService.showSnackBar('Não foi possível adicionar o funcionário!')
    })
  }

  onCancel(): void {
    this.router.navigate(['company'])
  }
}

import { CompanyEmployeeService } from './../../company-employee.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Company } from '../../company/company.model';

@Component({
  selector: 'app-employee-add-company',
  templateUrl: './employee-add-company.component.html',
  styleUrls: ['./employee-add-company.component.css']
})
export class EmployeeAddCompanyComponent {

  public company: Company = {
    cnpj: '',
  }

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private companyEmployeeService: CompanyEmployeeService) {}

  onAddCompany(): void {
    this.companyEmployeeService.company.cnpj = this.company.cnpj
    this.companyEmployeeService.create().subscribe(() => {
      this.companyEmployeeService.showSnackBar('Empresa adicionada!')
      this.router.navigate(['employee'])
    }, error => {
      this.companyEmployeeService.showSnackBar('Não foi possível adicionar a empresa!')
      console.error(error)
    })
  }

  onCancel(): void {
    this.router.navigate(['employee'])
  }
}

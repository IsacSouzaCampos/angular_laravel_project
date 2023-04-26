import { Component } from '@angular/core';
import { CompanyEmployeeService } from '../../company-employee.service';
import { Company } from '../../company/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-remove-company',
  templateUrl: './employee-remove-company.component.html',
  styleUrls: ['./employee-remove-company.component.css']
})
export class EmployeeRemoveCompanyComponent {

  public company: Company = {
    cnpj: ''
  }

  constructor(private companyEmployeeService: CompanyEmployeeService,
      private router: Router) {}

  onRemoveCompany(): void {
    this.companyEmployeeService.company.cnpj = this.company.cnpj
    this.companyEmployeeService.remove().subscribe(() => {
      this.companyEmployeeService.showSnackBar('Vínculo removido com sucesso!')
      this.router.navigate(['employee'])
    }, error => {
      this.companyEmployeeService.showSnackBar('Não foi possível remover o vínculo!')
      console.error(error)
    })
  }

  onCancel(): void {
    this.router.navigate(['employee'])
  }
}

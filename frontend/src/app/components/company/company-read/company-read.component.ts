import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { Company } from '../company.model';
import { CompanyEmployeeService } from '../../company-employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-read',
  templateUrl: './company-read.component.html',
  styleUrls: ['./company-read.component.css']
})
export class CompanyReadComponent {

  public company: Company = {
    id: -1,
    cnpj: '',
    name: '',
    location: ''
  }

  constructor(private companyService: CompanyService,
    private companyEmployeeService: CompanyEmployeeService,
    private router: Router) {}

  onSearch(): void {
    this.companyService.read(this.company.cnpj).subscribe(company => {
      this.company      = company
      this.company.show = true
    }, error => {
      this.companyService.showSnackBar(error.error.message)
    })
  }

  onAddEmployee(): void {
    this.companyEmployeeService.company.cnpj = this.company.cnpj
    this.router.navigate(['company/add-employee'])
  }

  onRemoveEmployee(): void {
    this.companyEmployeeService.company.cnpj = this.company.cnpj
    this.router.navigate(['company/remove-employee'])
  }

  onDelete(): void {
    this.companyService.remove(this.company.cnpj).subscribe(() => {
      this.companyService.showSnackBar('Empresa removida com sucesso!')
      
      // Faz um refresh da página 'company'
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['company'])
      })
    }, () => {
      this.companyService.showSnackBar('Não foi possível remover empresa!')
    })
  }
}

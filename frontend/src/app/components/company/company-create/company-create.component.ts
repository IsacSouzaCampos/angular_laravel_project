import { Company } from './../company.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent {

  private company: Company = {
    cnpj: '00000000000000',
    name: 'Fulano da Silva Ltda.',
    location: 'Rua do Fulano da Silva Ltda.'
  }

  constructor(private router: Router, 
    private companyService: CompanyService) {}

  onSave(): void {
    this.companyService.create(this.company).subscribe(() => {
      this.companyService.showSnackBar('Empresa cadastrada!')
      this.router.navigate(['company'])
    })
  }

  onCancel(): void {
    this.router.navigate(['company'])
  }

}

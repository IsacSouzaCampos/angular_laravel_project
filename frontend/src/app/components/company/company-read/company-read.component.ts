import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { Company } from '../company.model';

@Component({
  selector: 'app-company-read',
  templateUrl: './company-read.component.html',
  styleUrls: ['./company-read.component.css']
})
export class CompanyReadComponent {

  public company: Company = {
    cnpj: '',
    name: '',
    location: ''
  }

  constructor(private companyService: CompanyService) {}

  onSearch(): void {
    this.companyService.read(this.company.cnpj).subscribe(company => {
      // console.log(json)
      this.company = company
    }, error => {
      this.companyService.showSnackBar(error.error.message)
    })
  }
}

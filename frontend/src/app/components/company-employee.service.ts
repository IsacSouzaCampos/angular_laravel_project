import { Observable } from 'rxjs';
import { Company } from './company/company.model';
import { Injectable, SecurityContext } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from './employee/employee.model';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CompanyEmployeeService {

  private baseCompanyEmployeeUrl = 'http://127.0.0.1:8000/api/company_employee'

  public company: Company = {
    cnpj: ''
  }

  public employee: Employee = {
    cpf: ''
  }

  constructor(private snackBar: MatSnackBar,
      private httpClient: HttpClient,
      private sanitizer: DomSanitizer) { }

  showSnackBar(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  remove(): Observable<any> {
    let cnpj = this.sanitize(this.company.cnpj)
    let cpf  = this.sanitize(this.employee.cpf)
    
    return this.httpClient.delete<any>(this.baseCompanyEmployeeUrl + '/delete/' + cnpj + '/' + cpf)
  }

  create(): Observable<any> {
    let cnpj = this.sanitize(this.company.cnpj)
    let cpf  = this.sanitize(this.employee.cpf)
    
    let url = this.baseCompanyEmployeeUrl + '/create/' + cnpj + '/' + cpf
    console.log('URL de requisição: ' + url)
    return this.httpClient.post<any>(url, JSON.stringify(this.employee))
  }

  sanitize(value: string): string {
    value = value.replace(/[./-]/g, '');
    value = this.sanitizer.sanitize(SecurityContext.NONE, value) ?? ''
    return value
  }
}

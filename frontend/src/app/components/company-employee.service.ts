import { Observable } from 'rxjs';
import { Company } from './company/company.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from './employee/employee.model';
import { HttpClient } from '@angular/common/http';

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
      private httpClient: HttpClient) { }

  showSnackBar(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  remove(): Observable<any> {
    return this.httpClient.delete<any>(this.baseCompanyEmployeeUrl + '/delete/' + this.company.cnpj + 
      '/' + this.employee.cpf)
  }

  create(): Observable<any> {
    return this.httpClient.post<any>(this.baseCompanyEmployeeUrl + '/create/' + this.company.cnpj + '/' + 
      this.employee.cpf, JSON.stringify(this.employee))
  }
}

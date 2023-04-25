import { Company } from './../company/company.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  baseApiUrl = 'http://127.0.0.1:8000/api/employee'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  showSnackBar(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  create(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseApiUrl + '/create', JSON.stringify(employee),
                                        this.httpOptions)
  }

  read(cpf: string): Observable<Employee> {
    return this.httpClient.get<Employee>(this.baseApiUrl + '/' + cpf)
  }

  removeCompany(employee: Employee, cnpj: string): Observable<Employee> {
    let company_id = -1
    employee.companies?.forEach(company => {
      if (company.cnpj == cnpj && company.id) { 
        company_id = company.id
        return
      }
    })
    return this.httpClient.delete<Employee>(this.baseApiUrl + '/' + company_id + '/' + employee.id)
  }
}

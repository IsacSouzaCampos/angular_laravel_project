import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, SecurityContext } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Employee } from './employee.model';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseApiUrl = 'http://127.0.0.1:8000/api/employee'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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

  create(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseApiUrl + '/create', JSON.stringify(employee),
                                        this.httpOptions)
  }

  read(cpf: string): Observable<Employee> {
    cpf = this.sanitize(cpf)
    return this.httpClient.get<Employee>(this.baseApiUrl + '/' + cpf)
  }

  remove(cpf: string): Observable<any> {
    cpf = this.sanitize(cpf)
    let url = this.baseApiUrl + '/' + cpf
    return this.httpClient.delete<any>(url)
  }

  sanitize(value: string): string {
    value = value.replace(/[./-]/g, '');
    value = this.sanitizer.sanitize(SecurityContext.NONE, value) ?? ''
    return value
  }
}

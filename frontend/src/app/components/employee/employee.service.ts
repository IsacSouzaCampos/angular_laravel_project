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

  apiUrl = 'http://127.0.0.1:8000/api/employee'
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
    return this.httpClient.post<Employee>(this.apiUrl + '/create', JSON.stringify(employee),
                                        this.httpOptions)
  }
}

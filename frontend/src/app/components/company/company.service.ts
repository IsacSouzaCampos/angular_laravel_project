import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { Company } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseApiUrl = 'http://127.0.0.1:8000/api/company'

  // Informa quando há um conteúdo JSON no request
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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

  create(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(this.baseApiUrl + '/create', JSON.stringify(company), 
                                         this.httpOptions)
  }

  read(cnpj: string): Observable<Company> {
    return this.httpClient.get<Company>(this.baseApiUrl + '/' + cnpj)
  }
}

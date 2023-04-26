import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';

import { CompanyComponent } from './views/company/company.component';
import { EmployeeComponent } from './views/employee/employee.component';

import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { CompanyCreateComponent } from './components/company/company-create/company-create.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CompanyReadComponent } from './components/company/company-read/company-read.component';
import { EmployeeReadComponent } from './components/employee/employee-read/employee-read.component';
import { EmployeeRemoveCompanyComponent } from './components/employee/employee-remove-company/employee-remove-company.component';
import { EmployeeAddCompanyComponent } from './components/employee/employee-add-company/employee-add-company.component';
import { CompanyAddEmployeeComponent } from './components/company/company-add-employee/company-add-employee.component';
import { CompanyRemoveEmployeeComponent } from './components/company/company-remove-employee/company-remove-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    CompanyComponent,
    EmployeeComponent,
    EmployeeCreateComponent,
    CompanyCreateComponent,
    CompanyReadComponent,
    EmployeeReadComponent,
    EmployeeRemoveCompanyComponent,
    EmployeeAddCompanyComponent,
    CompanyAddEmployeeComponent,
    CompanyRemoveEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,

    FormsModule,

    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Company;
use App\Models\Employee;
use App\Models\CompanyEmployee;

class crudController extends Controller
{
    public function createCompanyEmployee(Request $request)
    {
        try
        {
            $cnpj = $request->cnpj;
            $cpf  = $request->cpf;

            // Busca o funcionário e a empresa
            $employee = Employee::where('cpf', $cpf)->firstOrFail();
            $company = Company::where('cnpj', $cnpj)->firstOrFail();

            // Cria uma nova relação entre eles
            $companyEmployee              = new CompanyEmployee;
            $companyEmployee->company_id  = $company->id;
            $companyEmployee->employee_id = $employee->id;
            $companyEmployee->save();

            return response()->json(['message' => 'Relação criada com sucesso!'], 200);
        } 
        catch(Exception $e)
        {
            return response()->json(['message' => 'Não foi possível relacionar empresa e funcionário.'], 500);
        }
    }


    public function createCompany(Request $request)
    {
        try
        {
            $company = new Company;

            $company->cnpj     = $request->cnpj;
            $company->name     = $request->name;
            $company->location = $request->location;
            $company->save();

            return response()->json(['message' => 'Empresa criada com sucesso!'], 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao inserir Empresa.'], 500);
        }
    }


    public function createEmployee(Request $request)
    {
        try
        {
            $employee = new Employee;

            $employee->cpf      = $request->cpf;
            $employee->name     = $request->name;
            $employee->location = $request->location;
            $employee->email    = $request->email;
            $employee->login    = $request->login;
            $employee->password = $request->password;
            $employee->save();

            return response()->json(['message' => 'Funcionário criado com sucesso!'], 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao inserir Funcionário.'], 500);
        }
    }


    public function getCompany($cnpj)
    {
        try
        {
            $company = Company::where('cnpj', $cnpj)->firstOrFail();
            return response()->json($company->with('employees')->find($company->id), 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao consultar Empresa.'], 500);
        }
    }


    public function getEmployee($cpf)
    {
        try
        {
            $employee = Employee::where('cpf', $cpf)->firstOrFail();
            return response()->json($employee->with('companies')->find($employee->id), 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao consultar Funcionário.'], 500);
        }
    }
}

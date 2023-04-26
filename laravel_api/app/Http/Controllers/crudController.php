<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

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
            $employee = Employee::where('cpf', $cpf)->first();
            $company = Company::where('cnpj', $cnpj)->first();

            if ($company->employees()->where('id', $employee->id)->exists())
            {
                return response()->json(['message' => 'Vínculo já existente!'], 500);
            }

            if (!$employee)
            {
                return response()->json(['message' => 'Funcionário não encontrado.'], 404);
            }
            if (!$company)
            {
                return response()->json(['message' => 'Empresa não encontrada.'], 404);
            }

            // Cria uma nova relação entre eles
            $companyEmployee              = new CompanyEmployee;
            $companyEmployee->company_id  = $company->id;
            $companyEmployee->employee_id = $employee->id;
            $companyEmployee->save();

            return response()->json(['message' => 'Vínculo criado com sucesso!'], 200);
        } 
        catch(Exception $e)
        {
            return response()->json(['message' => 'Não foi possível criar vínculo.'], 500);
        }
    }


    public function deleteCompanyEmployee($cnpj, $cpf) 
    {
        try
        {
            $company  = Company::where('cnpj', $cnpj)->first();
            $employee = Employee::where('cpf', $cpf)->first();

            if (!$company)
            {
                return response()->json(['message' => 'Empresa não encontrada!'], 404);
            }
            if (!$employee)
            {
                return response()->json(['message' => 'Funcionário não encontrado!'], 404);
            }

            // remove a relação com o funcionário
            $company->employees()->detach($employee->id);

            return response()->json(['message' => 'Relação empresa e funcionário desfeita!'], 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao desvincular empresa e funcionário!'], 500);
        }
    }


    public function createCompany(Request $request)
    {
        try
        {
            # Sanitizar
            $cnpj     = filter_var($request->cnpj, FILTER_SANITIZE_SPECIAL_CHARS);
            $name     = filter_var($request->name, FILTER_SANITIZE_SPECIAL_CHARS);
            $location = filter_var($request->location, FILTER_SANITIZE_SPECIAL_CHARS);

            $company = new Company;

            $company->cnpj     = $cnpj;
            $company->name     = $name;
            $company->location = $location;
            $company->save();

            return response()->json(['message' => 'Empresa criada com sucesso!'], 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao inserir Empresa.'], 500);
        }
    }

    public function getCompany($cnpj)
    {
        try
        {            
            # Consulta empresa
            $company = Company::where('cnpj', $cnpj)->first();

            # Retorna com mensagem de erro se empresa não foi encontrada
            if (!$company)
            {
                return response()->json(['message' => 'Empresa não encontrada.'], 404);
            }

            # Prepara lista de funcionários do retorno
            $employees = [];
            foreach ($company->employees as $employee)
            {
                array_push($employees, ['cpf' => $employee->cpf,
                                        'name' => $employee->name,
                                        'location' => $employee->location,
                                        'email' => $employee->email,
                                        'login' => $employee->login]);
            }

            # Cria dados de retorno
            $data = [
                'cnpj' => $company->cnpj,
                'name' => $company->name,
                'location' => $company->location,
                'employees' => $employees
            ];

            return response()->json($data, 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao consultar Empresa.'], 500);
        }
    }


    public function deleteCompany($cnpj)
    {
        try
        {
            $company = Company::where('cnpj', $cnpj)->first();

            if (!$company)
            {
                return response()->json(['message' => 'Empresa não encontrada!'], 404);
            }

            $company->delete();
            return response()->json(['message' => 'Empresa deletada com sucesso!'], 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao tentar deletar empresa!'], 500);
        }
    }


    public function createEmployee(Request $request)
    {
        try
        {
            # Sanitizar
            $cpf      = filter_var($request->cpf, FILTER_SANITIZE_SPECIAL_CHARS);
            $name     = filter_var($request->name, FILTER_SANITIZE_SPECIAL_CHARS);
            $location = filter_var($request->location, FILTER_SANITIZE_SPECIAL_CHARS);
            $email    = filter_var($request->email, FILTER_SANITIZE_EMAIL);
            $login    = filter_var($request->login, FILTER_SANITIZE_SPECIAL_CHARS);
            
            # Criptografa a senha
            $hash = password_hash($request->password, PASSWORD_DEFAULT);

            $employee = new Employee;

            $employee->cpf      = $cpf;
            $employee->name     = $name;
            $employee->location = $location;
            $employee->email    = $email;
            $employee->login    = $login;
            $employee->password = $hash;
            $employee->save();

            return response()->json(['message' => 'Funcionário criado com sucesso!'], 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao inserir Funcionário.'], 500);
        }
    }


    public function getEmployee($cpf)
    {
        try
        {
            $employee = Employee::where('cpf', $cpf)->first();

            # Retorna com mensagem de erro se funcionário não foi encontrado
            if (!$employee)
            {
                return response()->json(['message' => 'Funcionário não encontrado.'], 404);
            }

            $companies = [];
            foreach ($employee->companies as $company)
            {
                array_push($companies, ['cnpj' => $company->cnpj,
                                        'name' => $company->name,
                                        'location' => $company->location]);
            }

            $data = [
                'cpf' => $employee->cpf,
                'name' => $employee->name,
                'location' => $employee->location,
                'email' => $employee->email,
                'login' => $employee->login,
                'companies' => $companies
            ];

            return response()->json($data, 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao consultar Funcionário.'], 500);
        }
    }


    public function updateCompany(Request $request)
    {
        try
        {
            $company = Employee::where('cpf', $request->cnpj)->first();

            # Retorna com mensagem de erro se empresa não foi encontrada
            if (!$company)
            {
                return response()->json(['message' => 'Empresa não encontrada.'], 404);
            }

            $company->update([
                'name' => $request->name,
                'location' => $request->location
            ]);

            return response()->json(['message' => 'Dados da empresa atualizados!'], 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao atualizar dados da Empresa.'], 500);
        }
    }


    public function updateEmployee(Request $request)
    {
        try
        {
            $employee = Employee::where('cpf', $request->cpf)->first();

            # Retorna com mensagem de erro se funcionário não foi encontrado
            if (!$employee)
            {
                return response()->json(['message' => 'Funcionário não encontrado.'], 404);
            }

            $employee->update([
                'name' => $request->name,
                'location' => $request->location,
                'email' => $request->email
            ]);

            return response()->json(['message' => 'Dados do funcionários atualizados!'], 200);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Erro ao atualizar dados do Funcionário.'], 500);
        }
        
    }
}

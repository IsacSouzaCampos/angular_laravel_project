<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\crudController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('company/create', [crudController::class, 'createCompany']);

Route::get('company/{cnpj}', [crudController::class, 'getCompany']);

Route::delete('company/{cnpj}', [crudController::class, 'deleteCompany']);

Route::post('employee/create', [crudController::class, 'createEmployee']);

Route::get('employee/{cpf}', [crudController::class, 'getEmployee']);

Route::delete('employee/{cpf}', [crudController::class, 'deleteEmployee']);

Route::post('company_employee/create/{cnpj}/{cpf}', [crudController::class, 'createCompanyEmployee']);

Route::delete('company_employee/delete/{cnpj}/{cpf}', [crudController::class, 'deleteCompanyEmployee']);

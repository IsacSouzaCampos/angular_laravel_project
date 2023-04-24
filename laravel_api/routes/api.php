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

Route::post('company_employee/create', [crudController::class, 'createCompanyEmployee']);

Route::post('company/create', [crudController::class, 'createCompany']);

Route::post('employee/create', [crudController::class, 'createEmployee']);

Route::get('company/{cnpj}', [crudController::class, 'getCompany']);

Route::get('employee/{cpf}', [crudController::class, 'getEmployee']);

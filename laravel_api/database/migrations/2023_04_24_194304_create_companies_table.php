<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('cnpj')->nullable(false)->unique();
            $table->string('name')->nullable(false);
            $table->string('location')->nullable(false);
            $table->timestamps();
        });

        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('cpf')->nullable(false)->unique();
            $table->string('name')->nullable(false);
            $table->string('location')->nullable(false);
            $table->string('email')->nullable(false)->unique();
            $table->string('login')->nullable(false)->unique();
            $table->string('password')->nullable(false);
            $table->timestamps();
        });

        Schema::create('company_employee', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies');
            $table->foreignId('employee_id')->constrained('employees');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_employee');
        Schema::dropIfExists('companies');
        Schema::dropIfExists('employees');
    }
}

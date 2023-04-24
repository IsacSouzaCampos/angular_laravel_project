<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = ['cpf', 'name', 'location', 'email', 'login', 'password'];

    public function companies()
    {
        return $this->belongsToMany(Company::class);
    }
}

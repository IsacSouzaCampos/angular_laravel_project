import { Employee } from '../employee/employee.model';

// Modelo da empresa (referente ao banco de dados)
export interface Company {
    id?: number
    cnpj: string
    name?: string
    location?: string,
    employees?: Employee[],
    show?: boolean
}

import { Company } from '../company/company.model';

export interface Employee {
    id?: number
    cpf: string
    name?: string
    location?: string
    email?: string
    login?: string
    password?: string,
    companies?: Company[],
    show?: boolean
}

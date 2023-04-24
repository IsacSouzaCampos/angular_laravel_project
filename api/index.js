const express = require('express')
const bcrypt  = require('bcryptjs')
const cors = require('cors');

const app  = express()

// Parse JSON
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:4200'
}))


const db = require('knex')({
    client: 'pg',
    connection: {
        host : 'localhost',
        user : 'postgres',
        password : 'postgres',
        database : 'BRy'
    }
})


// Testa a conexão
db.raw('SELECT 1 + 1 AS RESULTADO')
    .then(() => {
        console.log('Conexão estabelecida com sucesso!');
    }).catch((err) => {
        console.error(`Erro ao conectar ao banco de dados: ${err}`);
})


const PORT = 8080;
app.listen(
    PORT,
    () => console.log(`http://localhost:${PORT}`)
)

const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

app.post('/employee', async (req, res) => {
    const { cpf, name, location, email, login, password } = req.body
    try {
        const hash   = await bcrypt.hash(password, 5)
        const data   = {cpf: cpf, name: name, location: location, email: email, login: login, password: hash}
        const result = await db('employees').insert(data).returning('id')

        const id = result[0]['id']
        return res.status(200).json({id: id, message: 'Funcionário cadastrado com êxito!'})
    } catch(e) {
        return res.status(500).json({message: 'Erro ao inserir funcionário. Verifique se os dados inseridos estão corretos.'})
    }
})


app.post('/company', async (req, res) => {
    const { cnpj, name, location } = req.body
    try {
        const data   = {cnpj: cnpj, name: name, location: location}
        const result = await db('companies').insert(data).returning('id')

        const id = result[0]['id']
        return res.status(200).json({id: id, message: 'Empresa cadastrada com êxito!'})
    } catch(e) {
        return res.status(500).json({message: 'Erro ao inserir empresa. Verifique se os dados inseridos estão corretos.'})
    }
})


app.post('/company-employee', async (req, res) => {
    const { cnpj, cpf } = req.body
    try {
        if (format.test(cnpj) || format.test(cpf)) {
            return res.status(500).json({message: 'Requisição com caracteres inválidos!'})
        }

        const result_companies  = await db('companies').first('id').where({cnpj: cnpj})
        const result_employees  = await db('employees').first('id').where({cpf: cpf})

        // Extrai o id do retorno das consultas
        const company_id  = result_companies.id
        const employee_id = result_employees.id

        // Consulta as empresas relacionadas ao funcionário
        const companies = await db('company_employee').select('company_id').where({employee_id: employee_id})
        
        // Cria uma lista com os ids das empresas relacionadas ao funcionário
        const companies_ids = companies.map(item => item.company_id)
        if (companies_ids.includes(company_id)) {  // Se relação já existe
            return res.status(500).json({message: 'Relação já existente!'})
        }

        const data = {company_id: company_id, employee_id: employee_id}
        const result = await db('company_employee').insert(data).returning('id')

        const id = result[0]['id']
        return res.status(200).json({id: id, message: 'Criada relação entre funcionário e empresa!'})
    } catch(e) {
        return res.status(500).json({message: 'Erro ao relacionar funcionário à empresa.'})
    }
})


app.get('/company/:cnpj', async (req, res) => {
    const { cnpj } = req.params
    try {
        // Consulta os dados da empresa e dos funcionários
        const result = await db('companies').select('companies.name as company_name', 'companies.location as company_location', 'employees.*')
                                            .join('company_employee', 'companies.id', '=', 'company_employee.company_id')
                                            .join('employees', 'company_employee.employee_id', '=', 'employees.id')
                                            .where('companies.cnpj', '=', cnpj)
        
        const employees = result.map(row => {
            return {
                id: row.id,
                cpf: row.cpf,
                name: row.name,
                location: row.location,
                email: row.email,
                login: row.login
            }
        })

        const company = {
            name: result[0].company_name,
            location: result[0].company_location,
            employees: employees
        }

        return res.status(200).json(company)
    } catch(e) {
        return res.status(500).json({message: 'Erro ao selecionar os dados da empresa!\n' + e})
    }
})


app.get('/employee/:cpf', async (req, res) => {
    const { cpf } = req.params
    try {
        // Consulta os dados da empresa e dos funcionários
        const result = await db('employees').select('employees.id as e_id', 'employees.cpf as e_cpf', 'employees.name as e_name', 
                                                    'employees.location as e_location', 'employees.email as e_email', 
                                                    'employees.login as e_login', 'companies.*')
                                            .join('company_employee', 'employees.id', '=', 'company_employee.employee_id')
                                            .join('companies', 'company_employee.company_id', '=', 'companies.id')
                                            .where('employees.cpf', '=', cpf)
        
        const companies = result.map(row => {
            return {
                id: row.id,
                cnpj: row.cnpj,
                name: row.name,
                location: row.location,
                email: row.email,
                login: row.login
            }
        })

        const employee = {
            id: result[0].e_id,
            cpf: result[0].e_cpf,
            name: result[0].e_name,
            location: result[0].e_location,
            email: result[0].e_email,
            login: result[0].e_login,
            companies: companies
        }

        return res.status(200).json(employee)
    } catch(e) {
        return res.status(500).json({message: 'Erro ao selecionar os dados da empresa!\n' + e})
    }
})

const database = require('../services/database.js')

const baseQuery = 
`
    SELECT a.chapa, a.codsecao, b.descricao area, a.nome, a.codfuncao, c.descricao funcao 
      FROM pfunc a
INNER JOIN psecao b ON a.codcoligada=b.codcoligada AND a.codsecao=b.codigo
INNER JOIN pfuncao c ON c.codcoligada=a.codcoligada AND a.codfuncao=c.codigo
`

async function find(context) {
    let query = baseQuery
    const binds = {}

    if (context.coligada && context.matricula) {
        binds.coligada = context.coligada.toString()
        binds.matricula = context.matricula.toString()
        
        query += ` WHERE a.codcoligada = :coligada AND a.chapa = :matricula`

    }

    const result = await database.simpleExecute(query, binds)

    return result.rows
}

module.exports.find = find
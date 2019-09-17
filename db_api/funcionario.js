const database = require('../services/database.js')

const baseQuery = 
`
    SELECT a.chapa, a.codsecao, b.descricao area, a.nome, a.codfuncao, c.descricao funcao 
      FROM pfunc a
INNER JOIN psecao b ON a.codcoligada=b.codcoligada AND a.codsecao=b.codigo
INNER JOIN pfuncao c ON c.codcoligada=a.codcoligada AND a.codfuncao=c.codigo
`

// Get – Carrega as informações de um funcionário (Passado como parâmetro a matricula) 
//  Retorno (Area e função).
// select a.chapa, a.codsecao, b.descricao area, a.nome, a.codfuncao, c.descricao funcao from pfunc a
// inner join psecao b on a.codcoligada=b.codcoligada and a.codsecao=b.codigo
// inner join pfuncao c on c.codcoligada=a.codcoligada and c.codfuncao=c.codigo

async function find(context) {
    let query = baseQuery
    const binds = {}

    if (context.coligada && context.matricula) {
        binds.coligada = context.coligada.toString()
        binds.matricula = context.matricula.toString()
        //binds.id = `%${context.id.toUpperCase()}%`
        //binds.id1 = `%${context.id.toUpperCase()}%`
        //binds.id2 = `%${context.id.toUpperCase()}%`

        //console.log(binds.id)
        //console.log(binds.id1)
        //console.log(binds.id2)
        
        query += ` WHERE a.codcoligada = :coligada AND a.chapa = :matricula`
        //query += ` WHERE c.nom_cliente LIKE :id OR c.nom_reduzido LIKE :id1 OR c.cod_cliente LIKE :id2`
    }
    console.log(query)
    const result = await database.simpleExecute(query, binds)
    console.log(result)

    return result.rows
}

module.exports.find = find
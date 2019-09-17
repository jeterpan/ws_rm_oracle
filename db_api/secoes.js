const database = require('../services/database.js')

const baseQuery = 
`
SELECT codigo, descricao
  FROM psecao
`

// Get  - Carrega todas as Seção de uma empresa (Passado como parâmetro o código da empresa selecionada) 
//  Retorno (CodSeção  e Descição) .
// select codigo, descricao from psecao where codcoligada = @Pcodicoligada

async function find(context) {
    let query = baseQuery
    const binds = {}

    if (context.coligada) {
        binds.coligada = context.coligada.toString()
        //binds.id = `%${context.id.toUpperCase()}%`
        //binds.id1 = `%${context.id.toUpperCase()}%`
        //binds.id2 = `%${context.id.toUpperCase()}%`

        //console.log(binds.id)
        //console.log(binds.id1)
        //console.log(binds.id2)
        
        query += ` WHERE codcoligada = :coligada`
    
    }
    console.log(query)
    const result = await database.simpleExecute(query, binds)
    console.log(result)

    return result.rows
}

module.exports.find = find
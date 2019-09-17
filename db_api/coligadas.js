const database = require('../services/database.js')

const baseQuery = 
`
SELECT codcoligada, nomefantasia 
  FROM gcoligada
`

async function find(context) {
    let query = baseQuery
    const binds = {}

    if (context.coligada) {
        //binds.id = `%${context.id.toUpperCase()}%`
        binds.coligada = context.coligada.toString()
        //binds.id1 = `%${context.id.toUpperCase()}%`
        //binds.id2 = `%${context.id.toUpperCase()}%`

        console.log('binds.coligada')
        console.log(binds.coligada)
        //console.log(binds.id1)
        //console.log(binds.id2)
        
        query += ` WHERE codcoligada = :coligada`
        //query += ` WHERE c.nom_cliente LIKE :id OR c.nom_reduzido LIKE :id1 OR c.cod_cliente LIKE :id2`
    } else {
        query += ` WHERE codcoligada <> 0`
    }
    console.log(query)
    const result = await database.simpleExecute(query, binds)
    console.log(result)

    return result.rows
}

module.exports.find = find
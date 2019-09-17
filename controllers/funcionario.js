const funcionario = require('../db_api/funcionario.js')

async function get(req, res, next) {
    try {
        const context = {}

        context.coligada = req.params.coligada
        context.matricula = req.params.matricula
        //console.log("contexto")
        //console.log(context.id)

        const rows = await funcionario.find(context)

        let meuRetorno = {}

        meuRetorno = { rows }

        // REVISAR AQUI
        if (req.params.coligada && req.params.matricula) {
            if (rows.length > 0) {
                res.status(200).json(meuRetorno)
            } else {
                //console.log(meuRetorno)
                console.log('nao encontrou dados para o filtro informado')
                res.status(404).end()
            }
        } else {
            res.status(200).json(meuRetorno)
        }
    } catch (err) {
        next(err)
    }
}

module.exports.get = get
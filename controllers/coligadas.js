const coligadas = require('../db_api/coligadas.js')

async function get(req, res, next) {
    try {
        const context = {}

        context.coligada = req.params.coligada

        const rows = await coligadas.find(context)

        let meuRetorno = {}

        meuRetorno = { coligadas: rows }

        if (req.params.id) {
            if (rows.length > 0) {
                res.status(200).json(meuRetorno)
            } else {
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
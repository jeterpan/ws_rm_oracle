const secoes = require('../db_api/secoes.js')

async function get(req, res, next) {
    try {
        const context = {}

        context.coligada = req.params.coligada

        const rows = await secoes.find(context)

        let meuRetorno = {}

        meuRetorno = { secoes: rows }

        if (req.params.coligada) {
            if (rows.length > 0) {
                res.status(200).json(meuRetorno)
            } else {
                console.log('nao encontrou dados para o filtro informado')
                res.status(404).end()
            }
        } else {
            res.status(400).json({"mensagem": " Informe a coligada para qual se deseja as secoes"})
        }
    } catch (err) {
        next(err)
    }
}

module.exports.get = get
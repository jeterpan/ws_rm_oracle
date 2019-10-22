const oracledb = require('oracledb')
const dbConfig = require('../config/database.js')

async function initialize() {
    const pool = await oracledb.createPool(dbConfig.rmPool)
}

module.exports.initialize = initialize

function simpleExecute(declaracao, binds, opcoes = {}) {
    return new Promise(async (resolve, reject) => {
        let conexao

        opcoes.outFormat = oracledb.OBJECT
        opcoes.autoCommit = true

        try {
            conexao = await oracledb.getConnection()
    
            const resultado = await conexao.execute(declaracao, binds, opcoes)

            resolve(resultado)
        } catch (erro) {
            console.log(`Erro ao tentar executar a Declaracao SQL no banco de dados: ${erro}`)
            reject(erro)
        } finally {
            if (conexao) {
                try {
                    await conexao.close()
                } catch (erro) {
                    console.log(`Erro ao fechar conexão com o banco de dados ${erro}`)
                    console.log(erro)
                    reject(erro)
                }
            }
        }
    })
}

module.exports.simpleExecute = simpleExecute

// Objetivo: Encerrar o Pool de conexoes do Banco de dados
async function encerra() {
    await oracledb.getPool().close();
}
   
module.exports.encerra = encerra;

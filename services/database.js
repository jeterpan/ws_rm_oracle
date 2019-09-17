const oracledb = require('oracledb')
const dbConfig = require('../config/database.js')

async function initialize() {
    const pool = await oracledb.createPool(dbConfig.hrPool)
}

module.exports.initialize = initialize

function simpleExecute(declaracao, binds, opcoes = {}) {
    return new Promise(async (resolve, reject) => {
        let conexao

        // REGRA DE NEGOCIO: Manter sempre o formato de retorno como OBJECT
        //           MOTIVO: Esta parece ser a forma mais convencional que a comunidade javascript usa para
        //                    para apresentar os dados dentro de um json
        opcoes.outFormat = oracledb.OBJECT
        opcoes.autoCommit = true

        // TODO: Se eu tiver uma Declaração SQL incorreta na db_api, ao executar aqui ocorrerá erro, e ela parece estar derrubando o node
        //        Aparece Unhandled error
        //        Bom, se é unhandled, talvez há alguma maneira então de eu tratá-los, evitando o crash da aplicação

        try {
            conexao = await oracledb.getConnection()

            //console.log(typeof(binds))
            //console.log(JSON.stringify(binds))

            // Melhoria desejada: Criar um parametro para definir o schema padrão para ser utilizado
            // Evita eu ter que ficar colocando LOGIX.<tabela>, visto que o este programa conecta no 
            //  oracle com usuario node, que tem acesso apenas de leitura nas tabelas
            //  e terá mais acessos apenas nas tabelas que serão necessárias.

            // estou achando estranho este comando ficar aqui
            // será que nao tem como num momento de inicializacao do banco ja iniciar com esta opção?
            //await conexao.execute(`alter session set current_schema=LOGIX`)
    
            const resultado = await conexao.execute(declaracao, binds, opcoes)
            //console.log(typeof(resultado))
            //console.log('Resultado')
            //console.log(resultado)
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
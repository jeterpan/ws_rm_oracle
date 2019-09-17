const http = require('http')
const express = require('express')
const webServerConfig = require('../config/web-server.js')
//const database = require('./database.js')
const router = require('./router.js')
const morgan = require('morgan')
const cors = require('cors')

// Let declara uma variavel com escopo Global
let hpttServer;

function initialize(){
    return new Promise((resolve, reject) => {
        
        const app = express()

        //app.use(cors())

        httpServer = http.createServer(app)

        app.use(morgan('combined'))

        app.use('/api', router);

        //app.get('/', async (req, res) => {
        //    const result = await database.simpleExecute('select cod_empresa,den_reduz from empresa')
        //    const codigo = result.rows[0].COD_EMPRESA
        //    const descricao = result.rows[0].DEN_REDUZ
        //   
        //    res.end(`codigo: ${codigo} e descricao: ${descricao}`)
        //})

        //app.get('/', (req,res) => {
        //    res.end('Hello World!')
        //})

        httpServer.listen(webServerConfig.port)
            .on('listening', () => {
                console.log(`Web server listening on localhost: ${webServerConfig.port}`)

                resolve()
            })
            .on('error', err => {
                reject(err)
            })
    })
}

module.exports.initialize = initialize

function close(){
    return new Promise((resolve,reject) => {
        httpServer.close((err) => {
            if(err){
                reject(err)
                return
            }

            resolve()
        })
    })
}

module.exports.close = close
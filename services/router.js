const express = require('express')
const router = new express.Router()
const coligadas = require('../controllers/coligadas.js')
const secoes = require('../controllers/secoes.js')
const funcionario = require('../controllers/funcionario.js')
    
// Get - Carrega todas as empresas do RM 
//  Retorno (CodEmpresa  e Descição).
// select codcoligada, nomefantasia from gcoligada where codcoligada <>0
router.route('/coligadas/:coligada?')
    .get(coligadas.get)

// Get  - Carrega todas as Seção de uma empresa (Passado como parâmetro o código da empresa selecionada) 
//  Retorno (CodSeção  e Descição) .
// select codigo, descricao from psecao where codcoligada = @Pcodicoligada
router.route('/secoes/:coligada?')
    .get(secoes.get)

// Get – Carrega as informações de um funcionário (Passado como parâmetro a matricula) 
//  Retorno (Area e função).
// select a.chapa, a.codsecao, b.descricao area, a.nome, a.codfuncao, c.descricao funcao from pfunc a
// inner join psecao b on a.codcoligada=b.codcoligada and a.codsecao=b.codigo
// inner join pfuncao c on c.codcoligada=a.codcoligada and c.codfuncao=c.codigo
router.route('/funcionario/:coligada?/:matricula?')
    .get(funcionario.get)
   
module.exports = router
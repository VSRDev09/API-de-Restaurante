const express = require("express");
const router = express.Router();

const RelatorioController = require("../Controllers/relatorioController");

// Relatório 1: pratos-mais-pedidos
router.get("/pratos-mais-pedidos", RelatorioController.pratosMaisPedidos);

// Relatório 2: clintes que mais pediram
router.get("/clientes-mais-pedidos", RelatorioController.clientesMaisPedidos);

// Relatório 3: clientes que mais gastaram
router.get("/clientes-mais-gastaram", RelatorioController.clientesMaisGastaram);

module.exports = router;
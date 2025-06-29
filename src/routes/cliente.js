const express = require("express");
const router = express.Router();

const ClienteController = require("../Controllers/clienteController");
const { checkNome, checkCpf } = require("../middlewares/middleware");

// Criar cliente
router.post("/", checkNome, checkCpf, ClienteController.criar);

//Listar todos os clientes
router.get("/", ClienteController.listar);

// Deletar cliente 
router.delete("/:id", ClienteController.remover);

// atualizar cliente
router.put("/:id", ClienteController.atualizar);

module.exports = router;
const service = require("../services/pedidoService");

function listar(req,res){
    service.listar(req.query)
    .then(pedidos => res.send({ dados: pedidos}))
    .catch(err => res.status(500).send({message: err.message}));
}

function criar (req, res) {
    service.criar(req.body)
    .then(pedidoCriado => res.status(201).send({
        message: "Pedido criado com sucesso",
        pedido: pedidoCriado
    }))
    .catch(err => res.status(500).send({ message: err.message}));
}

function atualizar (req, res) {
    service.atualizar(req.params.id, req.body)
    .then(pedidoEditado => {
        if (!pedidoEditado)
            return res.send({ message: "Pedido não encontrado"});

        return res.send({
            message: "Pedido atualizado com sucesso", 
            pedido: pedidoEditado
        });
    })
    .catch(err => res.status(500).send({ message: err.message}));
}

function remover(req,res){
    service.remover(req.params.id)
    .then(pedidoRemovido => {
        if (!pedidoRemovido)
            return res.send({ message: "Pedido não encontrado"});

        return res.send({
            message: "Pedido removido com sucesso",
            pedido: pedidoRemovido
        });
    })
    .catch(err => res.status(500).send({ message: err.message}));
}

module.exports = { listar, criar, atualizar, remover };
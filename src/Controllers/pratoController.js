const service = require("../services/pratoService");

function listar(req,res){
    service.listar(req.query)
    .then(pratos => res.send({ dados: pratos}))
    .catch(err => res.status(500).send({message: err.message}));
}

function criar (req, res) {
    service.criar(req.body)
    .then(pratoCriado => res.status(201).send({
        message: "Prato criado com sucesso",
        prato: pratoCriado
    }))
    .catch(err => res.status(500).send({ message: err.message}));
}

function atualizar (req, res) {
    service.atualizar(req.params.id, req.body)
    .then(pratoEditado => {
        if (!pratoEditado)
            return res.send({ message: "Prato não encontrado"});

        return res.send({
            message: "Prato atualizado com sucesso", 
            prato: pratoEditado
        });
    })
    .catch(err => res.status(500).send({ message: err.message}));
}

function remover(req,res){
    service.remover(req.params.id)
    .then(pratoRemovido => {
        if (!pratoRemovido)
            return res.send({ message: "Prato não encontrado"});

        return res.send({
            message: "Prato removido com sucesso",
            prato: pratoRemovido
        });
    })
    .catch(err => res.status(500).send({ message: err.message}));
}

module.exports = { listar, criar, atualizar, remover };
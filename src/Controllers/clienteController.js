const service = require("../Services/clienteService");

function listar(req,res){
    service.listar(req.query)
    .then(clientes => res.send({ dados: clientes}))
    .catch(err => res.status(500).send({message: err.message}));
}

function criar (req, res) {
    service.criar(req.body)
    .then(clienteCriado => res.status(201).send({
        message: "Cliente criado com sucesso",
        cliente: clienteCriado
    }))
    .catch(err => res.status(500).send({ message: err.message}));
}

function atualizar (req, res) {
    service.atualizar(req.params.id, req.body)
    .then(clienteEditado => {
        if (!clienteEditado)
            return res.send({ message: "Cliente não encontrado"});

        return res.send({
            message: "Cliente atualizado com sucesso", 
            cliente: clienteEditado
        });
    })
    .catch(err => res.status(500).send({ message: err.message}));
}

function remover(req,res){
    service.remover(req.params.id)
    .then(clienteRemovido => {
        if (!clienteRemovido)
            return res.send({ message: "Cliente não encontrado"});

        return res.send({
            message: "Cliente removido com sucesso",
            cliente: clienteRemovido
        });
    })
    .catch(err => res.status(500).send({ message: err.message}));
}

module.exports = { listar, criar, atualizar, remover };
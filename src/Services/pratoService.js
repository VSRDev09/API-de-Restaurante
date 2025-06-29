const Prato = require("../Models/prato");

function listar(filtro = {}) {
    return Prato.findAll({ where: filtro});
}

function criar(dados) {
    if(!dados.nome || dados.nome.length < 3 || dados.nome.length > 50) {
        return Promise.reject(new Error("Nome do prato deve ter entre 3 e 50 caracteres"));
    }

    if (typeof dados.preco !== "number" || dados.preco <= 0) {
        return Promise.reject(new Error("Preço deve ser um número positivo"));
    }

    return Prato.create(dados);
}

function atualizar(id, dados) {
  return Prato.findByPk(id).then(prato => {
    if (!prato) return null;

    if (dados.nome && (dados.nome.length < 3 || dados.nome.length > 50)) {
      return Promise.reject(new Error("Nome do prato deve ter entre 3 e 50 caracteres"));
    }

    if (dados.preco !== undefined && (typeof dados.preco !== "number" || dados.preco <= 0)) {
      return Promise.reject(new Error("Preço deve ser um número positivo"));
    }

    return prato.update(dados);
  });
}

function remover(id) {
    return Prato.findByPk(id).then(prato => {
        if (!prato) return null;

        return prato.destroy();
    })
}

module.exports = { listar, criar, atualizar, remover };
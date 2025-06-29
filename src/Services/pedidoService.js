const Pedido = require("../Models/pedido");
const Cliente = require("../Models/cliente");
const Prato = require("../Models/prato");

function listar(filtro = {}) {
    return Pedido.findAll({ where: filtro, include: [Cliente, Prato]});
}

async function criar(dados) {
    if (!dados.clienteId) {
        return Promise.reject(new Error("clienteId é obrigatório"));
    }

    if (!dados.pratoId) {
        return Promise.reject(new Error("pratoId é obrigatório"));
    }

    if (!dados.quantidade || typeof dados.quantidade !== "number" || dados.quantidade <= 0) {
        return Promise.reject(new Error("Quantidade deve ser o numero inteiro positivo"));
    }

    // verificar se cliente existe
    const cliente = await Cliente.findByPk(dados.clienteId);

    if (!cliente) {
        return Promise.reject(new Error("Cliente não encontrado"));
    }

    // verificar se prato existe
     const prato = await Prato.findByPk(dados.pratoId);
     if (!prato) {
        return Promise.reject(new Error("Prato não encontrado"));
    }

    // valor total
    const valorTotal = prato.preco * dados.quantidade;

    //pedido com valor total calculado
    return Pedido.create({
        clienteId: dados.clienteId,
        pratoId: dados.pratoId,
        quantidade: dados.quantidade,
        valorTotal: valorTotal
    });
    }

    async function atualizar(id, dados) {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) return null;

    //verificar se o clienteid e o pratoid existem antes de atualizar
    if (dados.clienteId) {
        const cliente = await Cliente.findByPk(dados.clienteId);
        if (!cliente) return Promise.reject(new Error("Cliente não encontrado"));
    }
    if(dados.pratoId) {
        const prato = await Prato.findByPk(dados.pratoId);
        if (!prato) return Promise.reject(new Error("Prato não encontrado"));
    }

     // Se quantidade for atualizada, validar
    if (dados.quantidade !== undefined) {
        if (typeof dados.quantidade !== "number" || dados.quantidade <= 0) {
            return Promise.reject(new Error("Quantidade deve ser um número inteiro positivo"));
        }
    }

    // Recalcular valorTotal se pratoId ou quantidade mudarem
    let prato = null;
    if (dados.pratoId) {
        prato = await Prato.findByPk(dados.pratoId);
    } else {
        prato = await Prato.findByPk(pedido.pratoId);
    }

    const quantidade = dados.quantidade !== undefined ? dados.quantidade : pedido.quantidade;
    const valorTotal = prato.preco * quantidade;

    // Atualiza os dados + valorTotal
    return pedido.update({
    ...dados,
    valorTotal: valorTotal
    });
    
    }

    async function remover(id) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return null;

    return pedido.destroy();
    }

    module.exports = { listar, criar, atualizar, remover };

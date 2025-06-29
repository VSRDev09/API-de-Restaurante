const Pedido = require("../Models/pedido");
const Cliente = require("../Models/cliente");
const Prato = require("../Models/prato");
const { Sequelize } = require("sequelize");

// 1. Pratos mais pedidos (TOP 5)
async function pratosMaisPedidos() {
  const pedidos = await Pedido.findAll({
    include: [{ model: Prato }],
  });

  const ranking = {};

  for (let pedido of pedidos) {
    const nome = pedido.prato.nome;
    ranking[nome] = (ranking[nome] || 0) + pedido.quantidade;
  }

  const ordenado = Object.entries(ranking)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // TOP 5

  return ordenado.map(([nome, qtd]) => ({
    prato: nome,
    quantidade: qtd,
  }));
}

// 2. Clientes que mais fizeram pedidos (TOP 5)
async function clientesMaisPedidos() {
  const pedidos = await Pedido.findAll({
    include: [{ model: Cliente }],
  });

  const contagem = {};

  for (let pedido of pedidos) {
    const nome = pedido.cliente.nome;
    contagem[nome] = (contagem[nome] || 0) + 1;
  }

  const ordenado = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // TOP 5

  return ordenado.map(([nome, total]) => ({
    cliente: nome,
    totalPedidos: total,
  }));
}

// 3. Clientes que mais gastaram (TOP 5)
async function clientesMaisGastaram() {
  const pedidos = await Pedido.findAll({
    include: [{ model: Cliente }],
  });

  const totalGasto = {};

  for (let pedido of pedidos) {
    const nome = pedido.cliente.nome;
    totalGasto[nome] = (totalGasto[nome] || 0) + pedido.valorTotal;
  }

  const ordenado = Object.entries(totalGasto)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // TOP 5

  return ordenado.map(([nome, total]) => ({
    cliente: nome,
    valorGasto: total.toFixed(2),
  }));
}

module.exports = {
  pratosMaisPedidos,
  clientesMaisPedidos,
  clientesMaisGastaram,
};

const relatorioService = require("../Services/relatorioService");

// Pratos mais pedidos
async function pratosMaisPedidos(req, res) {
  try {
    const dados = await relatorioService.pratosMaisPedidos();
    res.send({ dados });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Clientes que mais pediram
async function clientesMaisPedidos(req, res) {
  try {
    const dados = await relatorioService.clientesMaisPedidos();
    res.send({ dados });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// Clientes que mais gastaram
async function clientesMaisGastaram(req, res) {
  try {
    const dados = await relatorioService.clientesMaisGastaram();
    res.send({ dados });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  pratosMaisPedidos,
  clientesMaisPedidos,
  clientesMaisGastaram,
};

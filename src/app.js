require('dotenv').config({ path: ".env"});
require("./database/database")

const express = require('express');
const app = express();

const clienteRoutes = require("./routes/cliente")
const pratoRoutes = require("./routes/prato")
const pedidoRoutes = require("./routes/pedido")
const relatorioRoutes = require("./routes/relatorio")

app.use(express.json())

app.use("/clientes", clienteRoutes)
app.use("/pratos", pratoRoutes)
app.use("/pedidos", pedidoRoutes)
app.use("/relatorios", relatorioRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})

module.exports = app

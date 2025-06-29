const Sequelize = require("sequelize");

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        logging: false
    }
);

module.exports = database;

require("../Models/cliente");
require("../Models/prato");
require("../Models/pedido");


database.sync();


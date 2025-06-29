const database = require("../database/database");
const Sequelize = require("sequelize");

const Cliente = database.define("clientes", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },

    nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
            len: [11, 11],
            isNumeric:true
        }
    }
}, {
    timestamps:true
});

module.exports = Cliente;
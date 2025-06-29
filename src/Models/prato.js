const database = require("../database/database");
const Sequelize = require("sequelize");

const Prato = database.define("pratos", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            len: [3, 50]
        }
    },
    preco: {
        type: Sequelize.FLOAT,
        allowNull:false
    }
}, {
    timestamps: true
});

module.exports = Prato
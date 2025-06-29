const database = require("../database/database");
const Sequelize = require("sequelize");
const Cliente = require("./cliente");
const Prato = require("./prato");

const Pedido = database.define("pedidos", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    valorTotal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'id'
        }
    },

    pratoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Prato,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

Pedido.belongsTo(Cliente, { foreignKey: "clienteId"});
Cliente.hasMany(Pedido, { foreignKey: "clienteId"});

Pedido.belongsTo(Prato, { foreignKey: "pratoId" });
Prato.hasMany(Pedido, { foreignKey: "pratoId" });

module.exports = Pedido;
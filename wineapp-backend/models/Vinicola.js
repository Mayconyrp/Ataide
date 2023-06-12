const { Sequelize, DataTypes } = require('sequelize');
const wineappbd = require('../database/wineappdb');

const Vinicola = wineappbd.define('Vinicola', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_vinicola: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep_vinicola: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_uva: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ultima_colheita: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome_gerente: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

(async () => {
    await Vinicola.sync();
    console.log('Tabela de vinícola criada!');
})();

module.exports = Vinicola;

const { DataTypes } = require('sequelize');
const wineappdb = require('../database/wineappdb');

const Estoque = wineappdb.define('Estoque', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    uva: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_uva: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adubo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

(async () => {
    await Estoque.sync();
    console.log('Tabela de Estoque criada!');
})();

module.exports = Estoque;

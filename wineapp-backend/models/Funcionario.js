const { Sequelize, DataTypes } = require('sequelize');
const wineappbd = require('../database/wineappdb');

const Funcionario = wineappbd.define('Funcionario', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_funcionario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf_funcionario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salario_funcionario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    funcao_funcionario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

(async () => {
    await Funcionario.sync();
    console.log('Tabela de Funcionarios criada!');
})();

module.exports = Funcionario;

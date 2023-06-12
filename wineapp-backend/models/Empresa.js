    const { Sequelize, DataTypes } = require('sequelize');
    const wineappbd = require('../database/wineappdb');

    const Empresa = wineappbd.define('Empresa', {
        id_empresa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nome_empresa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cnpj_empresa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_empresa: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        telefone_empresa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    (async () => {
        await Empresa.sync();
        console.log('Tabela de usuários criada!');
    })();

    module.exports = Empresa;

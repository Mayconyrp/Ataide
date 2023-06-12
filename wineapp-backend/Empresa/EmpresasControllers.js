const express = require("express");
const router = express.Router();
const Empresa = require("../models/Empresa");

// Criação de uma nova empresa
router.post('/empresas', (req, res) => {
    const { nome_empresa, cnpj_empresa, email_empresa, telefone_empresa, password } = req.body;

    Empresa.create({
        nome_empresa,
        cnpj_empresa,
        email_empresa,
        telefone_empresa,
        password,
    })
        .then((novaEmpresa) => {
            console.log('Nova empresa criada:', novaEmpresa.toJSON());
            res.status(201).send('Empresa criada com sucesso');
        })
        .catch((error) => {
            console.error('Erro ao criar a empresa:', error);
            res.status(500).send('Erro ao criar a empresa');
        });
});

// Leitura de todas as empresas
router.get('/empresas', (req, res) => {
    Empresa.findAll()
        .then((empresas) => {
            console.log('Empresas encontradas:', empresas.map(empresa => empresa.toJSON()));
            res.status(200).send(empresas);
        })
        .catch((error) => {
            console.error('Erro ao buscar as empresas:', error);
            res.status(500).send('Erro ao buscar as empresas');
        });
});

// Leitura de uma empresa por ID
router.get('/empresas/:id', (req, res) => {
    const empresaId = req.params.id;

    Empresa.findByPk(empresaId)
        .then((empresa) => {
            if (empresa) {
                console.log('Empresa encontrada:', empresa.toJSON());
                res.status(200).send(empresa);
            } else {
                console.log('Empresa não encontrada');
                res.status(404).send('Empresa não encontrada');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar a empresa:', error);
            res.status(500).send('Erro ao buscar a empresa');
        });
});

// Atualização de uma empresa por ID
router.put('/empresas/:id_empresa', (req, res) => {
    const empresaId = req.params.id_empresa;
    const { nomeEmpresa, cnpjEmpresa, emailEmpresa, telefoneEmpresa, passwordEmpresa } = req.body;

    Empresa.findByPk(empresaId)
        .then((empresa) => {
            if (empresa) {
                empresa.nome_empresa = nomeEmpresa;
                empresa.cnpj_empresa = cnpjEmpresa;
                empresa.email_empresa = emailEmpresa;
                empresa.telefone_empresa = telefoneEmpresa;
                empresa.password = passwordEmpresa;

                empresa.save()
                    .then((empresaAtualizada) => {
                        console.log('Empresa atualizada:', empresaAtualizada.toJSON());
                        res.status(200).send(empresaAtualizada);
                    })
                    .catch((error) => {
                        console.error('Erro ao atualizar a empresa:', error);
                        res.status(500).send('Erro ao atualizar a empresa');
                    });
            } else {
                console.log('Empresa não encontrada');
                res.status(404).send('Empresa não encontrada');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar a empresa:', error);
            res.status(500).send('Erro ao buscar a empresa');
        });
});

// Exclusão de uma empresa por ID
router.delete('/empresas/:id', (req, res) => {
    const empresaId = req.params.id;

    Empresa.destroy({
        where: {
            id_empresa: empresaId
        }
    })
        .then((quantidadeExcluida) => {
            if (quantidadeExcluida > 0) {
                console.log('Empresa excluída com sucesso');
                res.status(204).send();
            } else {
                console.log('Empresa não encontrada');
                res.status(404).send('Empresa não encontrada');
            }
        })
        .catch((error) => {
            console.error('Erro ao excluir a empresa:', error);
            res.status(500).send('Erro ao excluir a empresa');
        });
});

module.exports = router;

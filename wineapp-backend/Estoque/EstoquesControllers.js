const express = require("express");
const router = express.Router();
const Estoque = require("../models/Estoque");

// Criação de um novo item de estoque
router.post('/estoque', (req, res) => {
    const { uva, tipo_uva, adubo } = req.body;

    Estoque.create({
        uva,
        tipo_uva,
        adubo,
    })
        .then((itemEstoque) => {
            console.log('Novo item de estoque criado:', itemEstoque.toJSON());
            res.status(201).send('Item de estoque criado com sucesso');
        })
        .catch((error) => {
            console.error('Erro ao criar o item de estoque:', error);
            res.status(500).send('Erro ao criar o item de estoque');
        });
});

// Leitura de todos os itens de estoque
router.get('/estoque', (req, res) => {
    Estoque.findAll()
        .then((estoque) => {
            console.log('Itens de estoque encontrados:', estoque.map(item => item.toJSON()));
            res.status(200).send(estoque);
        })
        .catch((error) => {
            console.error('Erro ao buscar os itens de estoque:', error);
            res.status(500).send('Erro ao buscar os itens de estoque');
        });
});

// Leitura de um item de estoque por ID
router.get('/estoque/:id', (req, res) => {
    const itemEstoqueId = req.params.id;

    Estoque.findByPk(itemEstoqueId)
        .then((itemEstoque) => {
            if (itemEstoque) {
                console.log('Item de estoque encontrado:', itemEstoque);
                res.status(200).send(itemEstoque);
            } else {
                console.log('Item de estoque não encontrado');
                res.status(404).send('Item de estoque não encontrado');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar o item de estoque:', error);
            res.status(500).send('Erro ao buscar o item de estoque');
        });
});

// Atualização de um item de estoque por ID
router.put('/estoque/:id', (req, res) => {
    const itemEstoqueId = req.params.id;
    const { uva, tipo_uva, adubo } = req.body;

    Estoque.findByPk(itemEstoqueId)
        .then((itemEstoque) => {
            if (itemEstoque) {
                itemEstoque.uva = uva;
                itemEstoque.tipo_uva = tipo_uva;
                itemEstoque.adubo = adubo;

                itemEstoque.save()
                    .then((itemEstoqueAtualizado) => {
                        console.log('Item de estoque atualizado:', itemEstoqueAtualizado.toJSON());
                        res.status(200).send(itemEstoqueAtualizado);
                    })
                    .catch((error) => {
                        console.error('Erro ao atualizar o item de estoque:', error);
                        res.status(500).send('Erro ao atualizar o item de estoque');
                    });
            } else {
                console.log('Item de estoque não encontrado');
                res.status(404).send('Item de estoque não encontrado');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar o item de estoque:', error);
            res.status(500).send('Erro ao buscar o item de estoque');
        });
});

// Exclusão de um item de estoque por ID
router.delete('/estoque/:id', (req, res) => {
    const itemEstoqueId = req.params.id;

    Estoque.destroy({
        where: {
            id: itemEstoqueId
        }
    })
        .then(() => {
            console.log('Item de estoque excluído com sucesso');
            res.status(204).send();
        })
        .catch((error) => {
            console.error('Erro ao excluir o item de estoque:', error);
            res.status(500).send('Erro ao excluir o item de estoque');
        });
});

module.exports = router;

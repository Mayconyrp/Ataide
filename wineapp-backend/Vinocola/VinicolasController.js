const express = require("express");
const router = express.Router();
const Vinicola = require("../models/Vinicola");

// Criação de uma nova vinícola
router.post('/vinicolas', async (req, res) => {
    try {
        const { nome_gerente, nome_vinicola, cep_vinicola, tipo_uva, ultima_colheita } = req.body;
        const vinicola = await Vinicola.create({
            nome_gerente,
            nome_vinicola,
            cep_vinicola,
            tipo_uva,
            ultima_colheita
        });
        console.log('Nova vinícola criada:', vinicola.toJSON());
        res.status(201).send('Vinícola criada com sucesso');
    } catch (error) {
        console.error('Erro ao criar a vinícola:', error);
        res.status(500).send('Erro ao criar a vinícola');
    }
});

// Leitura de todas as vinícolas
router.get('/vinicolas', async (req, res) => {
    try {
        const vinicolas = await Vinicola.findAll();
        console.log('Vinícolas encontradas:', vinicolas.map(vinicola => vinicola.toJSON()));
        res.status(200).send(vinicolas);
    } catch (error) {
        console.error('Erro ao buscar as vinícolas:', error);
        res.status(500).send('Erro ao buscar as vinícolas');
    }
});

// Leitura de uma vinícola por ID
router.get('/vinicolas/:id', async (req, res) => {
    const vinicolaId = req.params.id;
    try {
        const vinicola = await Vinicola.findByPk(vinicolaId);
        if (vinicola) {
            console.log('Vinícola encontrada:', vinicola.toJSON());
            res.status(200).send(vinicola);
        } else {
            console.log('Vinícola não encontrada');
            res.status(404).send('Vinícola não encontrada');
        }
    } catch (error) {
        console.error('Erro ao buscar a vinícola:', error);
        res.status(500).send('Erro ao buscar a vinícola');
    }
});

// Atualização de uma vinícola por ID
router.put('/vinicolas/:id', async (req, res) => {
    const vinicolaId = req.params.id;
    const { nome_gerente, nome_vinicola, cep_vinicola, tipo_uva, ultima_colheita } = req.body;
    try {
        const vinicola = await Vinicola.findByPk(vinicolaId);
        if (vinicola) {
            vinicola.nome_gerente = nome_gerente;
            vinicola.nome_vinicola = nome_vinicola;
            vinicola.cep_vinicola = cep_vinicola;
            vinicola.tipo_uva = tipo_uva;
            vinicola.ultima_colheita = ultima_colheita;
            const vinicolaAtualizada = await vinicola.save();
            console.log('Vinícola atualizada:', vinicolaAtualizada.toJSON());
            res.status(200).send(vinicolaAtualizada);
        } else {
            console.log('Vinícola não encontrada');
            res.status(404).send('Vinícola não encontrada');
        }
    } catch (error) {
        console.error('Erro ao atualizar a vinícola:', error);
        res.status(500).send('Erro ao atualizar a vinícola');
    }
});

// Exclusão de uma vinícola por ID
router.delete('/vinicolas/:id', async (req, res) => {
    const vinicolaId = req.params.id;
    try {
        await Vinicola.destroy({
            where: {
                id: vinicolaId
            }
        });
        console.log('Vinícola excluída com sucesso');
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir a vinícola:', error);
        res.status(500).send('Erro ao excluir a vinícola');
    }
});

// Rota para buscar a vinícola pelo CEP
router.get('/vinicolas/cep/:cep', async (req, res) => {
    const cep = req.params.cep;
    try {
        const vinicola = await Vinicola.findOne({
            where: { cep_vinicola: cep },
            attributes: ['nome_vinicola', 'nome_gerente', 'tipo_uva', 'ultima_colheita']
        });
        if (vinicola) {
            console.log('Vinícola encontrada:', vinicola.toJSON());
            res.status(200).send(vinicola);
        } else {
            console.log('Vinícola não encontrada');
            res.status(404).send('Vinícola não encontrada');
        }
    } catch (error) {
        console.error('Erro ao buscar a vinícola:', error);
        res.status(500).send('Erro ao buscar a vinícola');
    }
});

module.exports = router;

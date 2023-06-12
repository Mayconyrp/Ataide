const express = require("express");
const router = express.Router();
const Funcionario = require("../models/Funcionario");

// Criação de um novo Funcionario
router.post('/funcionarios', (req, res) => {
    const { nome_funcionario, cpf_funcionario, salario_funcionario, funcao_funcionario } = req.body;

    Funcionario.create({
        nome_funcionario,
        cpf_funcionario,
        salario_funcionario,
        funcao_funcionario,
    })
        .then((funcionarioCadastro) => {
            console.log('Novo funcionário criado:', funcionarioCadastro.toJSON());
            res.status(201).send('Funcionário criado com sucesso');
        })
        .catch((error) => {
            console.error('Erro ao criar o funcionário:', error);
            res.status(500).send('Erro ao criar o funcionário');
        });
});
// Leitura de todos os Funcionarios
router.get('/funcionarios', (req, res) => {
    Funcionario.findAll()
        .then((funcionarios) => {
            console.log('Funcionários encontrados:', funcionarios.map(funcionario => funcionario.toJSON()));
            res.status(200).send(funcionarios);
        })
        .catch((error) => {
            console.error('Erro ao buscar os funcionários:', error);
            res.status(500).send('Erro ao buscar os funcionários');
        });
});

// Leitura de um Funcionario por ID
router.get('/funcionarios/:id', (req, res) => {
    const funcionarioId = req.params.id;

    Funcionario.findByPk(funcionarioId)
        .then((funcionario) => {
            if (funcionario) {
                console.log('Funcionário encontrado:', funcionario);
                res.status(200).send(funcionario);
            } else {
                console.log('Funcionário não encontrado');
                res.status(404).send('Funcionário não encontrado');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar o funcionário:', error);
            res.status(500).send('Erro ao buscar o funcionário');
        });
});

// Atualização de um Funcionario por ID
router.put('/funcionarios/:id', (req, res) => {
    const funcionarioId = req.params.id;
    const { nome_funcionario, cpf_funcionario, salario_funcionario, funcao_funcionario } = req.body;

    Funcionario.findByPk(funcionarioId)
        .then((funcionario) => {
            if (funcionario) {
                funcionario.nome_funcionario = nome_funcionario;
                funcionario.cpf_funcionario = cpf_funcionario;
                funcionario.salario_funcionario = salario_funcionario;
                funcionario.funcao_funcionario = funcao_funcionario;

                funcionario.save()
                    .then((funcionarioAtualizado) => {
                        console.log('Funcionário atualizado:', funcionarioAtualizado.toJSON());
                        res.status(200).send(funcionarioAtualizado);
                    })
                    .catch((error) => {
                        console.error('Erro ao atualizar o funcionário:', error);
                        res.status(500).send('Erro ao atualizar o funcionário');
                    });
            } else {
                console.log('Funcionário não encontrado');
                res.status(404).send('Funcionário não encontrado');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar o funcionário:', error);
            res.status(500).send('Erro ao buscar o funcionário');
        });
});

// Exclusão de um Funcionario por ID
router.delete('/funcionarios/:id', (req, res) => {
    const funcionarioId = req.params.id;

    Funcionario.destroy({
        where: {
            id: funcionarioId
        }
    })
        .then(() => {
            console.log('Funcionário excluído com sucesso');
            res.status(204).send();
        })
        .catch((error) => {
            console.error('Erro ao excluir o funcionário:', error);
            res.status(500).send('Erro ao excluir o funcionário');
        });
});

module.exports = router;

const express = require('express');
const pool = require('../db');
const Matricula = require('../models/matricula');

const router = express.Router();

// Rota POST para criar uma nova matrícula
router.post('/matriculas', async (req, res) => {
  try {
    const { aluno_id, curso_id, data_matricula } = req.body;
    const novaMatricula = await Matricula.create(aluno_id, curso_id, data_matricula);
    res.json(novaMatricula);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para listar todas as matrículas
router.get('/matriculas', async (req, res) => {
  try {
    const matriculas = await Matricula.getAll();
    res.json(matriculas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para buscar uma matrícula por ID
router.get('/matriculas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matricula = await Matricula.getById(id);
    if (!matricula) {
      return res.status(404).send('Matrícula não encontrada');
    }
    res.json(matricula);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota PUT para atualizar uma matrícula por ID
router.put('/matriculas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { aluno_id, curso_id, data_matricula } = req.body;
    const matriculaAtualizada = await Matricula.update(id, aluno_id, curso_id, data_matricula);
    if (!matriculaAtualizada) {
      return res.status(404).send('Matrícula não encontrada');
    }
    res.json(matriculaAtualizada);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota DELETE para deletar uma matrícula por ID
router.delete('/matriculas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matriculaDeletada = await Matricula.delete(id);
    if (!matriculaDeletada) {
      return res.status(404).send('Matrícula não encontrada');
    }
    res.json({ message: 'Matrícula deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

module.exports = router;
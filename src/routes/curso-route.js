const express = require('express');
const pool = require('../db');
const Curso = require('../models/curso');

const router = express.Router();

// Rota POST para criar um novo curso
router.post('/cursos', async (req, res) => {
  try {
    const { nome, descricao, carga_horaria } = req.body;
    const novoCurso = await Curso.create(nome, descricao, carga_horaria);
    res.json(novoCurso);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para listar todos os cursos
router.get('/cursos', async (req, res) => {
  try {
    const cursos = await Curso.getAll();
    res.json(cursos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para buscar um curso por ID
router.get('/cursos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.getById(id);
    if (!curso) {
      return res.status(404).send('Curso não encontrado');
    }
    res.json(curso);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota PUT para atualizar um curso por ID
router.put('/cursos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, carga_horaria } = req.body;
    const cursoAtualizado = await Curso.update(id, nome, descricao, carga_horaria);
    if (!cursoAtualizado) {
      return res.status(404).send('Curso não encontrado');
    }
    res.json(cursoAtualizado);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota DELETE para deletar um curso por ID
router.delete('/cursos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cursoDeletado = await Curso.delete(id);
    if (!cursoDeletado) {
      return res.status(404).send('Curso não encontrado');
    }
    res.json({ message: 'Curso deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

module.exports = router;
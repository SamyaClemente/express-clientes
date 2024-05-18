
const express = require('express');
const pool = require('../db');
const Endereco = require('../models/endereco');

const router = express.Router();

// Rota POST para criar um novo endereço
router.post('/enderecos', async (req, res) => {
  try {
    const { rua, numero, complemento, bairro, cidade, estado, cep } = req.body;
    const novoEndereco = await Endereco.create(rua, numero, complemento, bairro, cidade, estado, cep);
    res.json(novoEndereco);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para listar todos os endereços
router.get('/enderecos', async (req, res) => {
  try {
    const enderecos = await Endereco.getAll();
    res.json(enderecos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para buscar um endereço por ID
router.get('/enderecos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const endereco = await Endereco.getById(id);
    if (!endereco) {
      return res.status(404).send('Endereço não encontrado');
    }
    res.json(endereco);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota PUT para atualizar um endereço por ID
router.put('/enderecos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rua, numero, complemento, bairro, cidade, estado, cep } = req.body;
    const enderecoAtualizado = await Endereco.update(id, rua, numero, complemento, bairro, cidade, estado, cep);
    if (!enderecoAtualizado) {
      return res.status(404).send('Endereço não encontrado');
    }
    res.json(enderecoAtualizado);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota DELETE para deletar um endereço por ID
router.delete('/enderecos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const enderecoDeletado = await Endereco.delete(id);
    if (!enderecoDeletado) {
      return res.status(404).send('Endereço não encontrado');
    }
    res.json({ message: 'Endereço deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

module.exports = router;

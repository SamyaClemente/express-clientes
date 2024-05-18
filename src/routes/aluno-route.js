const express = require('express');
const pool = require('../db');
const Aluno = require('../models/aluno');
const Endereco = require('../models/endereco');
const Curso = require('../models/curso');
const Matricula = require('../models/matricula');

const router = express.Router();

// Rota POST para criar um novo aluno junto com seu endereço e matrícula
// Rota POST para criar um novo aluno junto com seu endereço e matrícula
router.post('/alunos', async (req, res) => {
  const client = await pool.connect();
  try {
      await client.query('BEGIN');
      console.log('Transação iniciada');

      const { aluno, endereco, curso, data_matricula } = req.body;
      console.log('Dados recebidos:', { aluno, endereco, curso, data_matricula });

      // Verifique se o ID do curso está presente
      if (!curso || !curso.id) {
          throw new Error('ID do curso não fornecido');
      }

      // Salvar o endereço
      const novoEndereco = await Endereco.create(
          endereco.rua,
          endereco.numero,
          endereco.complemento,
          endereco.bairro,
          endereco.cidade,
          endereco.estado,
          endereco.cep
      );
      console.log('Endereço salvo:', novoEndereco);

      // Salvar o curso (ou obter o curso existente)
      console.log('Tentando obter curso com ID:', curso.id);
      const cursoExistente = await Curso.getById(curso.id);
      let cursoId;

      if (cursoExistente) {
          console.log('Curso existente encontrado:', cursoExistente);
          cursoId = cursoExistente.id;
      } else {
          console.log('Curso existente não encontrado, criando novo curso.');
          const novoCurso = await Curso.create(curso.nome, curso.descricao, curso.carga_horaria);
          console.log('Novo curso salvo:', novoCurso);
          cursoId = novoCurso.id;
      }

      // Salvar o aluno
      const novoAluno = await Aluno.create(
          aluno.nome,
          aluno.data_nascimento,
          aluno.genero,
          aluno.email,
          aluno.telefone,
          novoEndereco.id,
          cursoId
      );
      console.log('Aluno salvo:', novoAluno);

      // Salvar a matrícula
      await Matricula.create(novoAluno.id, cursoId, data_matricula);
      console.log('Matrícula salva para o aluno:', novoAluno.id);

      await client.query('COMMIT');
      console.log('Transação confirmada');

      res.json({
          message: 'Aluno e dados relacionados salvos com sucesso',
          aluno: novoAluno
      });
  } catch (err) {
      await client.query('ROLLBACK');
      console.error('Erro ocorrido:', err.message);
      console.log('Transação revertida');
      res.status(500).send('Erro do servidor');
  } finally {
      client.release();
      console.log('Conexão com o cliente liberada');
  }
});

// Rota GET para listar todos os alunos
router.get('/alunos', async (req, res) => {
    try {
      // Obter todos os alunos com informações de endereço e curso
      const alunos = await Aluno.getAllWithDetails(); // Implemente essa função em seu modelo Aluno
      res.json(alunos);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro do servidor');
    }
  });
  
  
  // Rota GET para buscar um aluno por ID
  router.get('/alunos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const aluno = await Aluno.getById(id);
      if (!aluno) {
        return res.status(404).send('Aluno não encontrado');
      }
      res.json(aluno);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro do servidor');
    }
  });
  
  // Rota PUT para atualizar um aluno por ID
  router.put('/alunos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, data_nascimento, genero, email, telefone, endereco_id, curso_id } = req.body;
      const alunoAtualizado = await Aluno.update(id, nome, data_nascimento, genero, email, telefone, endereco_id, curso_id);
      if (!alunoAtualizado) {
        return res.status(404).send('Aluno não encontrado');
      }
      res.json(alunoAtualizado);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro do servidor');
    }
  });
  
  // Rota DELETE para deletar um aluno por ID
  router.delete('/alunos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const alunoDeletado = await Aluno.delete(id);
      if (!alunoDeletado) {
        return res.status(404).send('Aluno não encontrado');
      }
      res.json({ message: 'Aluno deletado com sucesso' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro do servidor');
    }
  });
  





module.exports = router;

const express = require('express');
const router = express.Router();
const Candidato = require('../models/candidato');
const ExperienciaProfissional = require('../models/experienciaProfissional');
const Educacao = require('../models/educacao');
const Habilidade = require('../models/habilidade');
const pool = require('../db');



router.post('/candidatos', async (req, res) => {
  const client = await pool.connect(); // Conecte-se ao banco de dados usando o pool
  console.log('Pool importado:', pool);
  
  try {
    await client.query('BEGIN');  // Inicia a transação
    
    // Desestrutura o JSON recebido
    const { candidato, experiencias_profissionais, educacoes, habilidades } = req.body;
    
    // Salva o candidato
    const novoCandidato = await Candidato.create(
      candidato.nome,
      candidato.email,
      candidato.telefone,
      candidato.endereco,
      candidato.data_nascimento
    );
    
    const candidatoId = novoCandidato.id;  // Obtenha o ID do candidato recém-criado
    
    // Salva as experiências profissionais
    for (const experiencia of experiencias_profissionais) {
      await ExperienciaProfissional.create(
        candidatoId,
        experiencia.cargo,
        experiencia.empresa,
        experiencia.data_inicio,
        experiencia.data_fim,
        experiencia.descricao
      );
    }
    
    // Salva as educações
    for (const educacao of educacoes) {
      await Educacao.create(
        candidatoId,
        educacao.instituicao,
        educacao.curso,
        educacao.nivel_educacional,
        educacao.data_inicio,
        educacao.data_conclusao,
        educacao.descricao
      );
    }
    
    // Salva as habilidades
    for (const habilidade of habilidades) {
      await Habilidade.create(
        candidatoId,
        habilidade.habilidade
      );
    }
    
    // Confirme a transação
    await client.query('COMMIT');
    
    // Responde com sucesso
    res.json({
      message: 'Candidato e dados relacionados salvos com sucesso',
      candidato: novoCandidato
    });
    console.log('Salvando candidato:', candidato);
console.log('Salvando experiências profissionais:', experiencias_profissionais);
console.log('Salvando educações:', educacoes);
console.log('Salvando habilidades:', habilidades);

    
  } catch (err) {
    // Reverte a transação em caso de erro
    await client.query('ROLLBACK');
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  } finally {
    client.release(); // Libere a conexão
  }
});

router.get('/candidatos', async (req, res) => {
  try {
    // Consulta ao banco de dados para obter a lista de candidatos com informações relacionadas
    const query = `
      SELECT
        c.id AS candidato_id,
        c.nome,
        c.email,
        c.telefone,
        c.endereco,
        c.data_nascimento,
        json_agg(
          json_build_object(
            'id', ep.id,
            'cargo', ep.cargo,
            'empresa', ep.empresa,
            'data_inicio', ep.data_inicio,
            'data_fim', ep.data_fim,
            'descricao', ep.descricao
          )
        ) FILTER (WHERE ep.id IS NOT NULL) AS experiencias_profissionais,
        json_agg(
          json_build_object(
            'id', e.id,
            'instituicao', e.instituicao,
            'curso', e.curso,
            'nivel_educacional', e.nivel_educacional,
            'data_inicio', e.data_inicio,
            'data_conclusao', e.data_conclusao,
            'descricao', e.descricao
          )
        ) FILTER (WHERE e.id IS NOT NULL) AS educacoes,
        json_agg(
          json_build_object(
            'id', h.id,
            'habilidade', h.habilidade
          )
        ) FILTER (WHERE h.id IS NOT NULL) AS habilidades
      FROM candidato c
      LEFT JOIN experienciaprofissional ep ON c.id = ep.candidato_id
      LEFT JOIN educacao e ON c.id = e.candidato_id
      LEFT JOIN habilidade h ON c.id = h.candidato_id
      GROUP BY c.id, c.nome, c.email, c.telefone, c.endereco, c.data_nascimento
    `;

    const { rows } = await pool.query(query); // Executando a consulta

    // Respondendo com a lista de candidatos e suas informações relacionadas
    res.json({
      candidatos: rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para buscar um candidato por ID
router.get('/candidatos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const candidato = await Candidato.getById(id);
    
    // Verifica se o candidato existe
    if (!candidato) {
      return res.status(404).send('Candidato não encontrado');
    }
    
    res.json(candidato);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota PUT para atualizar um candidato por ID
router.put('/candidatos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, endereco, data_nascimento } = req.body;
    
    // Atualiza o candidato
    const candidatoAtualizado = await Candidato.update(id, nome, email, telefone, endereco, data_nascimento);
    
    // Verifica se o candidato foi atualizado
    if (!candidatoAtualizado) {
      return res.status(404).send('Candidato não encontrado');
    }
    
    res.json(candidatoAtualizado);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota DELETE para deletar um candidato por ID
router.delete('/candidatos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Deleta o candidato
    const candidatoDeletado = await Candidato.delete(id);
    
    // Verifica se o candidato foi deletado
    if (!candidatoDeletado) {
      return res.status(404).send('Candidato não encontrado');
    }
    
    res.json({ message: 'Candidato deletado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});


// Rota GET para buscar experiências profissionais por ID de candidato
router.get('/experiencias-profissionais/:candidato_id', async (req, res) => {
  try {
    const { candidato_id } = req.params;
    const experienciasProfissionais = await ExperienciaProfissional.getByCandidatoId(candidato_id);
    
    // Verifique se existem experiências profissionais para o candidato
    if (!experienciasProfissionais || experienciasProfissionais.length === 0) {
      return res.status(404).send('Nenhuma experiência profissional encontrada para o candidato');
    }
    
    res.json(experienciasProfissionais);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para buscar uma experiência profissional por ID
router.get('/experiencias-profissionais/experiencia/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const experienciaProfissional = await ExperienciaProfissional.getById(id);
    
    // Verifique se a experiência profissional foi encontrada
    if (!experienciaProfissional) {
      return res.status(404).send('Experiência profissional não encontrada');
    }
    
    res.json(experienciaProfissional);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota PUT para atualizar uma experiência profissional por ID
router.put('/experiencias-profissionais/atualiza/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { candidato_id, cargo, empresa, data_inicio, data_fim, descricao } = req.body;
    
    // Atualiza a experiência profissional
    const experienciaProfissionalAtualizada = await ExperienciaProfissional.update(
      id,
      candidato_id,
      cargo,
      empresa,
      data_inicio,
      data_fim,
      descricao
    );
    
    // Verifique se a experiência profissional foi atualizada
    if (!experienciaProfissionalAtualizada) {
      return res.status(404).send('Experiência profissional não encontrada');
    }
    
    res.json(experienciaProfissionalAtualizada);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota DELETE para deletar uma experiência profissional por ID
router.delete('/experiencias-profissionais/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Deleta a experiência profissional
    const experienciaProfissionalDeletada = await ExperienciaProfissional.delete(id);
    
    // Verifique se a experiência profissional foi deletada
    if (!experienciaProfissionalDeletada) {
      return res.status(404).send('Experiência profissional não encontrada');
    }
    
    res.json({ message: 'Experiência profissional deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});


// Rotas para Educacao
// Rota POST para criar uma nova educação
router.post('/educacoes', async (req, res) => {
  try {
    const {
      candidato_id,
      instituicao,
      curso,
      nivel_educacional,
      data_inicio,
      data_conclusao,
      descricao
    } = req.body;

    // Verifique se os dados recebidos são válidos
    if (!candidato_id || !instituicao || !curso || !nivel_educacional || !data_inicio) {
      return res.status(400).send('Parâmetros inválidos ou incompletos');
    }

    // Cria uma nova entrada de educação
    const novaEducacao = await Educacao.create(
      candidato_id,
      instituicao,
      curso,
      nivel_educacional,
      data_inicio,
      data_conclusao,
      descricao
    );

    res.json(novaEducacao);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para buscar educações por ID de candidato
router.get('/educacoes/candidato/:candidato_id', async (req, res) => {
  try {
    const { candidato_id } = req.params;
    const educacoes = await Educacao.getByCandidatoId(candidato_id);

    // Verifique se existem educações associadas ao candidato
    if (!educacoes || educacoes.length === 0) {
      return res.status(404).send('Nenhuma educação encontrada para o candidato');
    }

    res.json(educacoes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para buscar uma educação por ID
router.get('/educacoes/educacao/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const educacao = await Educacao.getById(id);

    // Verifique se a educação foi encontrada
    if (!educacao) {
      return res.status(404).send('Educação não encontrada');
    }

    res.json(educacao);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota PUT para atualizar uma educação por ID
router.put('/educacoes/atualiza/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      candidato_id,
      instituicao,
      curso,
      nivel_educacional,
      data_inicio,
      data_conclusao,
      descricao
    } = req.body;

    // Atualiza a educação
    const educacaoAtualizada = await Educacao.update(
      id,
      candidato_id,
      instituicao,
      curso,
      nivel_educacional,
      data_inicio,
      data_conclusao,
      descricao
    );

    // Verifique se a educação foi atualizada
    if (!educacaoAtualizada) {
      return res.status(404).send('Educação não encontrada');
    }

    res.json(educacaoAtualizada);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota DELETE para deletar uma educação por ID
router.delete('/educacoes/deleta/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Deleta a educação
    const educacaoDeletada = await Educacao.delete(id);

    // Verifique se a educação foi deletada
    if (!educacaoDeletada) {
      return res.status(404).send('Educação não encontrada');
    }

    res.json({ message: 'Educação deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});


// Rotas para Habilidade
// Rota POST para criar uma nova habilidade
router.post('/habilidades', async (req, res) => {
  try {
    const { candidato_id, habilidade } = req.body;

    // Verifique se os dados recebidos são válidos
    if (!candidato_id || !habilidade) {
      return res.status(400).send('Parâmetros inválidos ou incompletos');
    }

    // Cria uma nova habilidade
    const novaHabilidade = await Habilidade.create(candidato_id, habilidade);
    res.json(novaHabilidade);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para buscar habilidades por ID de candidato
router.get('/habilidades/candidato/:candidato_id', async (req, res) => {
  try {
    const { candidato_id } = req.params;
    const habilidades = await Habilidade.getByCandidatoId(candidato_id);

    // Verifique se existem habilidades associadas ao candidato
    if (!habilidades || habilidades.length === 0) {
      return res.status(404).send('Nenhuma habilidade encontrada para o candidato');
    }

    res.json(habilidades);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota GET para buscar uma habilidade por ID
router.get('/habilidades/habilidade/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const habilidade = await Habilidade.getById(id);

    // Verifique se a habilidade foi encontrada
    if (!habilidade) {
      return res.status(404).send('Habilidade não encontrada');
    }

    res.json(habilidade);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota PUT para atualizar uma habilidade por ID
router.put('/habilidades/atualiza/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { candidato_id, habilidade } = req.body;

    // Atualiza a habilidade
    const habilidadeAtualizada = await Habilidade.update(id, candidato_id, habilidade);

    // Verifique se a habilidade foi atualizada
    if (!habilidadeAtualizada) {
      return res.status(404).send('Habilidade não encontrada');
    }

    res.json(habilidadeAtualizada);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// Rota DELETE para deletar uma habilidade por ID
router.delete('/habilidades/deleta/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Deleta a habilidade
    const habilidadeDeletada = await Habilidade.delete(id);

    // Verifique se a habilidade foi deletada
    if (!habilidadeDeletada) {
      return res.status(404).send('Habilidade não encontrada');
    }

    res.json({ message: 'Habilidade deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

module.exports = router;

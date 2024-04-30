const pool = require('../db');

class Educacao {
    static async create(candidato_id, instituicao, curso, nivel_educacional, data_inicio, data_conclusao, descricao) {
      const query = 'INSERT INTO educacao (candidato_id, instituicao, curso, nivel_educacional, data_inicio, data_conclusao, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [candidato_id, instituicao, curso, nivel_educacional, data_inicio, data_conclusao, descricao];
      const { rows } = await pool.query(query, values);
      return rows[0];
    }
  
    static async getByCandidatoId(candidato_id) {
      const query = 'SELECT * FROM educacao WHERE candidato_id = $1';
      const { rows } = await pool.query(query, [candidato_id]);
      return rows;
    }
  
    static async getById(id) {
      const query = 'SELECT * FROM educacao WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    }
  
    static async update(id, candidato_id, instituicao, curso, nivel_educacional, data_inicio, data_conclusao, descricao) {
      const query = 'UPDATE educacao SET candidato_id = $2, instituicao = $3, curso = $4, nivel_educacional = $5, data_inicio = $6, data_conclusao = $7, descricao = $8 WHERE id = $1 RETURNING *';
      const values = [id, candidato_id, instituicao, curso, nivel_educacional, data_inicio, data_conclusao, descricao];
      const { rows } = await pool.query(query, values);
      return rows[0];
    }
  
    static async delete(id) {
      const query = 'DELETE FROM educacao WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    }
  }
  
  module.exports =  Educacao;
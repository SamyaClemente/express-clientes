const pool = require('../db');

class ExperienciaProfissional {
    static async create(candidato_id, cargo, empresa, data_inicio, data_fim, descricao) {
      const query = 'INSERT INTO experienciaprofissional (candidato_id, cargo, empresa, data_inicio, data_fim, descricao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const values = [candidato_id, cargo, empresa, data_inicio, data_fim, descricao];
      const { rows } = await pool.query(query, values);
      return rows[0];
    }
  
    static async getByCandidatoId(candidato_id) {
      const query = 'SELECT * FROM experienciaprofissional WHERE candidato_id = $1';
      const { rows } = await pool.query(query, [candidato_id]);
      return rows;
    }
  
    static async getById(id) {
      const query = 'SELECT * FROM experienciaprofissional WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    }
  
    static async update(id, candidato_id, cargo, empresa, data_inicio, data_fim, descricao) {
      const query = 'UPDATE experienciaprofissional SET candidato_id = $2, cargo = $3, empresa = $4, data_inicio = $5, data_fim = $6, descricao = $7 WHERE id = $1 RETURNING *';
      const values = [id, candidato_id, cargo, empresa, data_inicio, data_fim, descricao];
      const { rows } = await pool.query(query, values);
      return rows[0];
    }
  
    static async delete(id) {
      const query = 'DELETE FROM experienciaprofissional WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    }
  }
  
  module.exports =   ExperienciaProfissional ;
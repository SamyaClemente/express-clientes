const pool = require('../db');


class Habilidade {
    static async create(candidato_id, habilidade) {
      const query = 'INSERT INTO habilidade (candidato_id, habilidade) VALUES ($1, $2) RETURNING *';
      const values = [candidato_id, habilidade];
      const { rows } = await pool.query(query, values);
      return rows[0];
    }
  
    static async getByCandidatoId(candidato_id) {
      const query = 'SELECT * FROM habilidade WHERE candidato_id = $1';
      const { rows } = await pool.query(query, [candidato_id]);
      return rows;
    }
  
    static async getById(id) {
      const query = 'SELECT * FROM habilidade WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    }
  
    static async update(id, candidato_id, habilidade) {
      const query = 'UPDATE habilidade SET candidato_id = $2, habilidade = $3 WHERE id = $1 RETURNING *';
      const values = [id, candidato_id, habilidade];
      const { rows } = await pool.query(query, values);
      return rows[0];
    }
  
    static async delete(id) {
      const query = 'DELETE FROM habilidade WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    }
  }

  module.exports =  Habilidade ;
const pool = require('../db');

class Candidato {
  static async create(nome, email, telefone, endereco, data_nascimento) {
    const query = 'INSERT INTO candidato (nome, email, telefone, endereco, data_nascimento) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nome, email, telefone, endereco, data_nascimento];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM candidato';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM candidato WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, nome, email, telefone, endereco, data_nascimento) {
    const query = 'UPDATE candidato SET nome = $2, email = $3, telefone = $4, endereco = $5, data_nascimento = $6 WHERE id = $1 RETURNING *';
    const values = [id, nome, email, telefone, endereco, data_nascimento];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM candidato WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}








module.exports = Candidato;


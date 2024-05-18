const pool = require('../db');

class Aluno {
  static async create(nome, data_nascimento, genero, email, telefone, endereco_id, curso_id) {
    const query = 'INSERT INTO Alunos (nome, data_nascimento, genero, email, telefone, endereco_id, curso_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [nome, data_nascimento, genero, email, telefone, endereco_id, curso_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM Alunos';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getAllWithDetails() {
    const query = `
      SELECT
        a.*,
        e.* AS endereco,
        c.* AS curso
      FROM Alunos a
      LEFT JOIN Enderecos e ON a.endereco_id = e.id
      LEFT JOIN Cursos c ON a.curso_id = c.id
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM Alunos WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, nome, data_nascimento, genero, email, telefone, endereco_id, curso_id) {
    const query = 'UPDATE Alunos SET nome = $2, data_nascimento = $3, genero = $4, email = $5, telefone = $6, endereco_id = $7, curso_id = $8 WHERE id = $1 RETURNING *';
    const values = [id, nome, data_nascimento, genero, email, telefone, endereco_id, curso_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM Alunos WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }


}

module.exports = Aluno;

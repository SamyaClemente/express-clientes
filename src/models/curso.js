const pool = require('../db');

class Curso {
  static async create(nome, descricao, carga_horaria) {
    const query = 'INSERT INTO Cursos (nome, descricao, carga_horaria) VALUES ($1, $2, $3) RETURNING *';
    const values = [nome, descricao, carga_horaria];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM Cursos';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM Cursos WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, nome, descricao, carga_horaria) {
    const query = 'UPDATE Cursos SET nome = $2, descricao = $3, carga_horaria = $4 WHERE id = $1 RETURNING *';
    const values = [id, nome, descricao, carga_horaria];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM Cursos WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = Curso;

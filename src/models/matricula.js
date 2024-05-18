const pool = require('../db');

class Matricula {
  static async create(aluno_id, curso_id, data_matricula) {
    const query = 'INSERT INTO Matriculas (aluno_id, curso_id, data_matricula) VALUES ($1, $2, $3) RETURNING *';
    const values = [aluno_id, curso_id, data_matricula];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM Matriculas';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(aluno_id, curso_id) {
    const query = 'SELECT * FROM Matriculas WHERE aluno_id = $1 AND curso_id = $2';
    const { rows } = await pool.query(query, [aluno_id, curso_id]);
    return rows[0];
  }

  static async update(aluno_id, curso_id, data_matricula) {
    const query = 'UPDATE Matriculas SET data_matricula = $3 WHERE aluno_id = $1 AND curso_id = $2 RETURNING *';
    const values = [aluno_id, curso_id, data_matricula];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(aluno_id, curso_id) {
    const query = 'DELETE FROM Matriculas WHERE aluno_id = $1 AND curso_id = $2 RETURNING *';
    const { rows } = await pool.query(query, [aluno_id, curso_id]);
    return rows[0];
  }
}

module.exports = Matricula;

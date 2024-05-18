const pool = require('../db');

class Endereco {
  static async create(rua, numero, complemento, bairro, cidade, estado, cep) {
    const query = 'INSERT INTO Enderecos (rua, numero, complemento, bairro, cidade, estado, cep) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [rua, numero, complemento, bairro, cidade, estado, cep];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM Enderecos';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM Enderecos WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, rua, numero, complemento, bairro, cidade, estado, cep) {
    const query = 'UPDATE Enderecos SET rua = $2, numero = $3, complemento = $4, bairro = $5, cidade = $6, estado = $7, cep = $8 WHERE id = $1 RETURNING *';
    const values = [id, rua, numero, complemento, bairro, cidade, estado, cep];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM Enderecos WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = Endereco;

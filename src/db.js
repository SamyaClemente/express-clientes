const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'roundhouse.proxy.rlwy.net',
  database: 'postgres',
  password: 'WXCQKoqXRpDTpksBZqEytdoaSOtKLgoS',
  port: 38575,
});

module.exports = pool;

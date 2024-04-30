const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const swaggerRoutes = require('./routes/swagger');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', routes);
app.use('/', swaggerRoutes); // Adiciona a rota do Swagger

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

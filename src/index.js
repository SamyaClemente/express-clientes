const express = require('express');
const bodyParser = require('body-parser');
const swaggerRoutes = require('./routes/swagger');
const routesAluno = require('./routes/aluno-route');
const routesCurso = require('./routes/curso-route');
const routesEndereco = require('./routes/endereco-route');
const routesMatricula = require('./routes/matricula-route');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', routesAluno);
app.use('/api', routesCurso);
app.use('/api', routesEndereco);
app.use('/api', routesMatricula);
app.use('/', swaggerRoutes); // Adiciona a rota do Swagger

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

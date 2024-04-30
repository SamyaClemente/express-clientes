const express = require('express');
const router = express.Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(options);

/**
 * @swagger
 * components:
 *   schemas:
 *     Candidato:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         telefone:
 *           type: string
 *         endereco:
 *           type: string
 *         data_nascimento:
 *           type: string
 */

/**
 * @swagger
 * /api/candidatos:
 *   post:
 *     summary: Cria um novo candidato
 *     description: Cria um novo candidato com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidato'
 *     responses:
 *       '200':
 *         description: Candidato criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       '500':
 *         description: Erro do servidor
 *
 *   get:
 *     summary: Obtém todos os candidatos
 *     description: Retorna uma lista de todos os candidatos cadastrados
 *     responses:
 *       '200':
 *         description: Requisição bem sucedida. Retorna a lista de candidatos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidato'
 *       '500':
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /api/candidatos/{id}:
 *   get:
 *     summary: Obtém detalhes de um candidato específico
 *     description: Retorna os detalhes do candidato com o ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do candidato
 *     responses:
 *       '200':
 *         description: Requisição bem sucedida. Retorna os detalhes do candidato.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       '404':
 *         description: Candidato não encontrado
 *       '500':
 *         description: Erro do servidor
 *
 *   put:
 *     summary: Atualiza um candidato existente
 *     description: Atualiza os dados de um candidato com o ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do candidato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidato'
 *     responses:
 *       '200':
 *         description: Candidato atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       '404':
 *         description: Candidato não encontrado
 *       '500':
 *         description: Erro do servidor
 *
 *   delete:
 *     summary: Deleta um candidato
 *     description: Deleta um candidato com o ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do candidato
 *     responses:
 *       '200':
 *         description: Candidato deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidato'
 *       '404':
 *         description: Candidato não encontrado
 *       '500':
 *         description: Erro do servidor
 */

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocs));

module.exports = router;

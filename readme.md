# Projeto de Gerenciamento de Candidatos

Este é um projeto de gerenciamento de candidatos que permite o cadastro, atualização, remoção e visualização de candidatos, experiências profissionais, educações e habilidades associadas. As rotas estão documentadas abaixo com exemplos de JSON de entrada.

## URL base da API

As rotas da API estão disponíveis em: [https://express-clientes.onrender.com/api](https://express-clientes.onrender.com)

## Rotas

### POST `/api/candidatos`

Adiciona um novo candidato com dados relacionados (experiências profissionais, educações e habilidades).

- **Entrada**: Um objeto JSON com as seguintes propriedades:
  - `candidato` (objeto): Dados do candidato.
    - `nome` (string): Nome do candidato.
    - `email` (string): Email do candidato.
    - `telefone` (string): Telefone do candidato.
    - `endereco` (string): Endereço do candidato.
    - `data_nascimento` (string): Data de nascimento do candidato.
  - `experiencias_profissionais` (lista de objetos): Lista de experiências profissionais do candidato.
    - Cada objeto inclui as seguintes propriedades:
      - `cargo` (string): Cargo da experiência profissional.
      - `empresa` (string): Empresa da experiência profissional.
      - `data_inicio` (string): Data de início da experiência profissional.
      - `data_fim` (string, opcional): Data de fim da experiência profissional.
      - `descricao` (string, opcional): Descrição da experiência profissional.
  - `educacoes` (lista de objetos): Lista de educações do candidato.
    - Cada objeto inclui as seguintes propriedades:
      - `instituicao` (string): Instituição de ensino.
      - `curso` (string): Curso estudado.
      - `nivel_educacional` (string): Nível educacional (graduação, pós-graduação, etc.).
      - `data_inicio` (string): Data de início do curso.
      - `data_conclusao` (string, opcional): Data de conclusão do curso.
      - `descricao` (string, opcional): Descrição da educação.
  - `habilidades` (lista de objetos): Lista de habilidades do candidato.
    - Cada objeto inclui a seguinte propriedade:
      - `habilidade` (string): Habilidade do candidato.

### GET `/api/candidatos`

Retorna a lista de todos os candidatos com informações relacionadas (experiências profissionais, educações, habilidades).

### GET `/api/candidatos/:id`

Retorna as informações de um candidato específico com base em seu ID.

### PUT `/api/candidatos/:id`

Atualiza as informações de um candidato específico com base em seu ID.

- **Entrada**: Um objeto JSON com as seguintes propriedades:
  - `nome` (string): Nome do candidato.
  - `email` (string): Email do candidato.
  - `telefone` (string): Telefone do candidato.
  - `endereco` (string): Endereço do candidato.
  - `data_nascimento` (string): Data de nascimento do candidato.

### DELETE `/api/candidatos/:id`

Remove um candidato específico com base em seu ID.

### GET `/api/experiencias-profissionais/:candidato_id`

Retorna as experiências profissionais associadas a um candidato específico com base em seu ID.

### GET `/api/experiencias-profissionais/experiencia/:id`

Retorna as informações de uma experiência profissional específica com base em seu ID.

### PUT `/api/experiencias-profissionais/atualiza/:id`

Atualiza uma experiência profissional específica com base em seu ID.

- **Entrada**: Um objeto JSON com as seguintes propriedades:
  - `candidato_id` (int): ID do candidato associado.
  - `cargo` (string): Cargo da experiência profissional.
  - `empresa` (string): Empresa da experiência profissional.
  - `data_inicio` (string): Data de início da experiência profissional.
  - `data_fim` (string, opcional): Data de fim da experiência profissional.
  - `descricao` (string, opcional): Descrição da experiência profissional.

### DELETE `/api/experiencias-profissionais/delete/:id`

Remove uma experiência profissional específica com base em seu ID.

### POST `/api/educacoes`

Adiciona uma nova educação para um candidato.

- **Entrada**: Um objeto JSON com as seguintes propriedades:
  - `candidato_id` (int): ID do candidato.
  - `instituicao` (string): Instituição de ensino.
  - `curso` (string): Curso estudado.
  - `nivel_educacional` (string): Nível educacional (graduação, pós-graduação, etc.).
  - `data_inicio` (string): Data de início do curso.
  - `data_conclusao` (string, opcional): Data de conclusão do curso.
  - `descricao` (string, opcional): Descrição da educação.

### GET `/api/educacoes/candidato/:candidato_id`

Retorna as educações associadas a um candidato específico com base em seu ID.

### GET `/api/educacoes/educacao/:id`

Retorna as informações de uma educação específica com base em seu ID.

### PUT `/api/educacoes/atualiza/:id`

Atualiza uma educação específica com base em seu ID.

- **Entrada**: Um objeto JSON com as seguintes propriedades:
  - `candidato_id` (int): ID do candidato.
  - `instituicao` (string): Instituição de ensino.
  - `curso` (string): Curso estudado.
  - `nivel_educacional` (string): Nível educacional.
  - `data_inicio` (string): Data de início do curso.
  - `data_conclusao` (string, opcional): Data de conclusão do curso.
  - `descricao` (string, opcional): Descrição da educação.

### DELETE `/api/educacoes/deleta/:id`

Remove uma educação específica com base em seu ID.

### POST `/api/habilidades`

Adiciona uma nova habilidade para um candidato.

- **Entrada**: Um objeto JSON com as seguintes propriedades:
  - `candidato_id` (int): ID do candidato.
  - `habilidade` (string): Habilidade do candidato.

### GET `/api/habilidades/candidato/:candidato_id`

Retorna as habilidades associadas a um candidato específico com base em seu ID.

### GET `/api/habilidades/habilidade/:id`

Retorna as informações de uma habilidade específica com base em seu ID.

### PUT `/api/habilidades/atualiza/:id`

Atualiza uma habilidade específica com base em seu ID.

- **Entrada**: Um objeto JSON com as seguintes propriedades:
  - `candidato_id` (int): ID do candidato.
  - `habilidade` (string): Habilidade.

### DELETE `/api/habilidades/deleta/:id`

Remove uma habilidade específica com base em seu ID.

## Exemplo de JSON de Entrada

O exemplo a seguir mostra um JSON com um candidato, suas experiências profissionais, educações e habilidades associadas:

```json
{
    "candidato": {
        "nome": "Maria Oliveira",
        "email": "maria.oliveira@example.com",
        "telefone": "(21) 98765-4321",
        "endereco": "Avenida Atlântica, 456",
        "data_nascimento": "1988-10-20"
    },
    "experiencias_profissionais": [
        {
            "cargo": "Gerente de Projetos",
            "empresa": "Empresa X",
            "data_inicio": "2019-05-01",
            "data_fim": "2021-07-31",
            "descricao": "Liderou equipe de desenvolvimento e entregou projetos de sucesso"
        },
        {
            "cargo": "Analista de Sistemas",
            "empresa": "Empresa Y",
            "data_inicio": "2017-03-01",
            "data_fim": "2019-04-30",
            "descricao": "Responsável pela análise de sistemas e implementação de soluções"
        }
    ],
    "educacoes": [
        {
            "instituicao": "Instituto Z",
            "curso": "Engenharia de Software",
            "nivel_educacional": "Pós-graduação",
            "data_inicio": "2020-02-01",
            "data_conclusao": "2021-12-31",
            "descricao": "Curso avançado em desenvolvimento de software"
        }
    ],
    "habilidades": [
        {
            "habilidade": "Java"
        },
        {
            "habilidade": "SQL"
        },
        {
            "habilidade": "React"
        },
        {
            "habilidade": "Node.js"
        }
    ]
}

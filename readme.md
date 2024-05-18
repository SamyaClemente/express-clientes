### Alunos

- - -

#### POST `/api/alunos`

Cria um novo aluno junto com seu endereço, curso e data de matrícula.

* **Entrada**: Um objeto JSON com as seguintes propriedades:
```json
{
	"aluno": {
		"nome": "João da Silva",
		"data_nascimento": "2000-01-01",
		"genero": "M",
		"email": "joao.silva@example.com",
		"telefone": "123456789"
	},
	"endereco": {
		"rua": "Rua Exemplo",
		"numero": "123",
		"complemento": "Apto 101",
		"bairro": "Centro",
		"cidade": "São Paulo",
		"estado": "SP",
		"cep": "01000-000"
	},
	"curso": {
		"id": 1,
		"nome": "Ciência da Computação",
		"descricao": "Curso de graduação em Ciência da Computação",
		"carga_horaria": 3600
	},
	"data_matricula": "2024-05-18"
}

```

####   GET /api/alunos
Retorna a lista de todos os alunos.

#### GET /api/alunos/:id
Retorna as informações de um aluno específico com base em seu ID.

#### PUT /api/alunos/:id
Atualiza as informações de um aluno específico com base em seu ID.

####  DELETE /api/alunos/:id
Remove um aluno específico com base em seu ID.



#### Cursos

- - -
#### POST /api/cursos
Cria um novo curso.

Entrada: Um objeto JSON com as seguintes propriedades:


```json
{
	"nome": "Ciência da Computação",
	"descricao": "Curso de graduação em Ciência da Computação",
	"carga_horaria": 3600
}
```

#### GET /api/cursos
Retorna a lista de todos os cursos.

#### GET /api/cursos/:id
Retorna as informações de um curso específico com base em seu ID.

#### PUT /api/cursos/:id
Atualiza as informações de um curso específico com base em seu ID.

#### DELETE /api/cursos/:id
Remove um curso específico com base em seu ID.


#### Endereços

- - -
#### POST /api/enderecos
Cria um novo endereço.

Entrada: Um objeto JSON com as seguintes propriedades:

```json
{
	"rua": "Rua Exemplo",
	"numero": "123",
	"complemento": "Apto 101",
	"bairro": "Centro",
	"cidade": "São Paulo",
	"estado": "SP",
	"cep": "01000-000"
}
```
####  GET /api/enderecos
Retorna a lista de todos os endereços.

#### GET /api/enderecos/:id
Retorna as informações de um endereço específico com base em seu ID.

#### PUT /api/enderecos/:id
Atualiza as informações de um endereço específico com base em seu ID.

#### DELETE /api/enderecos/:id

Remove um endereço específico com base em seu ID.

### Matrículas

- - -

### POST /api/matriculas
Cria uma nova matrícula.

Entrada: Um objeto JSON com as seguintes propriedades:

```json
{
	"id_aluno": 1,
	"id_curso": 1,
	"data_matricula": "2024-05-18"
}
```

### GET /api/matriculas
Retorna a lista de todas as matrículas.

### GET /api/matriculas/:id
Retorna as informações de uma matrícula específica com base em seu ID.

### PUT /api/matriculas/:id
Atualiza as informações de uma matrícula específica com base em seu ID.

### DELETE /api/matriculas/:id
Remove uma matrícula específica com base em seu ID.
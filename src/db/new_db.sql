CREATE TABLE Alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    genero CHAR(1),
    email VARCHAR(100),
    telefone VARCHAR(15),
    endereco_id INT,
    curso_id INT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_endereco FOREIGN KEY (endereco_id) REFERENCES Enderecos(id),
    CONSTRAINT fk_curso FOREIGN KEY (curso_id) REFERENCES Cursos(id)
);
CREATE TABLE Enderecos (
    id SERIAL PRIMARY KEY,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    estado VARCHAR(50),
    cep VARCHAR(15)
);
CREATE TABLE Cursos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    carga_horaria INT
);

CREATE TABLE Matriculas (
    aluno_id INT,
    curso_id INT,
    data_matricula DATE,
    PRIMARY KEY (aluno_id, curso_id),
    CONSTRAINT fk_aluno FOREIGN KEY (aluno_id) REFERENCES Alunos(id),
    CONSTRAINT fk_curso FOREIGN KEY (curso_id) REFERENCES Cursos(id)
);

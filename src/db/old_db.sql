CREATE TABLE Candidato (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    data_nascimento DATE
);

CREATE TABLE ExperienciaProfissional (
    id SERIAL PRIMARY KEY,
    candidato_id INT REFERENCES Candidato(id),
    cargo VARCHAR(100) NOT NULL,
    empresa VARCHAR(100) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    descricao TEXT
);

CREATE TABLE Educacao (
    id SERIAL PRIMARY KEY,
    candidato_id INT REFERENCES Candidato(id),
    instituicao VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL,
    nivel_educacional VARCHAR(50) NOT NULL,
    data_inicio DATE NOT NULL,
    data_conclusao DATE,
    descricao TEXT
);

CREATE TABLE Habilidade (
    id SERIAL PRIMARY KEY,
    candidato_id INT REFERENCES Candidato(id),
    habilidade VARCHAR(100) NOT NULL
);

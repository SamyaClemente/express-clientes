# Use a imagem oficial do Node.js versão 20
FROM node:20

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package*.json /app/
RUN npm ci --omit=dev

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . /app

# Define a variável de ambiente para a porta 8080
ENV PORT=8080

# Exponha a porta 8080
EXPOSE 8080

# Define o comando padrão para iniciar o aplicativo
CMD ["npm", "start"]

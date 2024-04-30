FROM node:20

# Crie o diretório do app
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto da aplicação
COPY . .

# Transpile o código com Babel
RUN npm run build

# Defina a porta
ENV PORT=8080
EXPOSE 8080

# Inicie a aplicação em produção
CMD [ "npm", "run", "start:prod" ]

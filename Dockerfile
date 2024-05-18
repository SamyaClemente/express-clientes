FROM node:20

# Define a variável de ambiente para a porta
ENV PORT 8080

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o conteúdo do diretório atual para o diretório de trabalho no contêiner
COPY . /app

# Instala as dependências de desenvolvimento, incluindo o nodemon
RUN npm install --only=development

# Limpa o cache do npm e remove a pasta node_modules
RUN npm cache clean --force \
    && rm -rf node_modules

# Instala as dependências de produção
RUN npm install --only=production

# Expõe a porta 8080 do contêiner
EXPOSE 8080

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD [ "npm", "start" ]

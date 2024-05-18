FROM node:20

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o conteúdo do diretório atual para o diretório de trabalho no contêiner
COPY . /app

# Limpa o cache do npm
RUN npm cache clean --force

# Instala as dependências
RUN npm install

# Se estiver construindo o código para produção, você pode descomentar a linha abaixo
# RUN npm ci --omit=dev

# Define a variável de ambiente para a porta
ENV PORT 8080

# Expõe a porta 8080 do contêiner
EXPOSE 8080

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD [ "npm", "start" ]

FROM node:20


# Create app directory
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app


# If you are building your code for production
# RUN npm ci --omit=dev

ENV PORT 8080
EXPOSE 8080
CMD [ "npm", "start" ]

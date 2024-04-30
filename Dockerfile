FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# If you are building your code for production
# RUN npm ci --omit=dev

ENV PORT 8080
EXPOSE 8080
CMD [ "npm", "start" ]

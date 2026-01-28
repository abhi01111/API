FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

COPY . .

# CRA needs these for Docker
ENV HOST=0.0.0.0
ENV PORT=3000
ENV CI=false

EXPOSE 3000

CMD ["npm", "start"]

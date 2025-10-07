# ---- Base image ----
FROM node:18-alpine AS base

# Gerekli araçları kur (sadece 1 kez)
RUN apk add --no-cache wget tar

# MongoDB shell (mongosh) ekle
RUN wget https://downloads.mongodb.com/compass/mongosh-1.10.6-linux-x64.tgz && \
    tar -xvf mongosh-1.10.6-linux-x64.tgz && \
    cp mongosh-1.10.6-linux-x64/bin/mongosh /usr/local/bin/ && \
    rm -rf mongosh-1.10.6-linux-x64.tgz mongosh-1.10.6-linux-x64

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ortam değişkenini build-time'da ayarlayabilmek için ARG tanımla
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

EXPOSE 5000

# NODE_ENV'e göre davranış değiştir
CMD if [ "$NODE_ENV" = "development" ]; then \
        echo "Running in development mode"; \
        npm run dev; \
    else \
        echo "Running in production mode"; \
        npm start; \
    fi

FROM node:18-alpine

# MongoDB shell'i ekle
RUN wget https://downloads.mongodb.com/compass/mongosh-1.10.6-linux-x64.tgz && \
    tar -xvf mongosh-1.10.6-linux-x64.tgz && \
    cp mongosh-1.10.6-linux-x64/bin/mongosh /usr/local/bin/ && \
    rm -rf mongosh-1.10.6-linux-x64.tgz mongosh-1.10.6-linux-x64

# wget ve tar komutları için gerekli paketleri ekle
RUN apk add --no-cache wget tar

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
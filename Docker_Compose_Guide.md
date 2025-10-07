# 🐳 Projenin Docker-Compose ile Başlatılması

Bu proje, Docker Compose kullanarak konteyner ortamında çalışabilmektedir. Aşağıdaki adımları takip ederek projeyi çalıştırabilirsiniz.

## 1. 🚀 Konteynerları Başlat

Proje ana dizininde aşağıdaki komut ile Docker Compose üzerinden gerekli servisleri çalıştırın:

```sh
docker-compose up --build
```

Bu işlem, `mongodb`, `server` ve `client` konteynerlarını başlatacaktır.

### 1.1 Servisleri ayrı ayrı çalıştırma (opsiyonel)

Eğer servisleri ayrı ayrı kontrol etmek isterseniz (ör. geliştirme sırasında hızlı testler), aşağıdaki komutları kullanabilirsiniz. Not: Her servis kendi `Dockerfile`'ına sahiptir ve varsayılan olarak `NODE_ENV=development` ayarlıdır. Production image almak için build sırasında `--build-arg NODE_ENV=production` kullanın.

Server (development):

```sh
cd server && docker build -t server . && docker run -p 5000:5000 server
```

Server (production):

```sh
cd server && docker build -t server-prod --build-arg NODE_ENV=production . && docker run -p 5000:5000 server-prod
```

Client (development):

```sh
cd client && docker build -t client . && docker run -p 3000:3000 client
```

Client (production):

```sh
cd client && docker build -t client-prod --build-arg NODE_ENV=production . && docker run -p 3000:3000 client-prod
```

Not: Bazı sistemlerde Docker Compose komutu `docker compose` (boşluk) şeklinde de kullanılabilir. Her iki varyasyonu da aşağıda görebilirsiniz:

```sh
docker-compose up --build
docker compose up --build
```

## 2. 🌱 Veritabanını Seed Script ile Besle

### a. 🖥️ Docker Desktop ile;

Docker Desktopta server konteynerına gidip

```sh
npm run seed
```
komutu ile konteyner içerisindeki veritbanını besleyebiliyoruz.

### b. 💻 Terminal üzerinden dış müdahale;

Terminal üzerinden, çalışmakta olan docker-compose `server` konteynerına müdahale edebiliriz.

```sh
docker-compose exec server node seed-one-time-relationship.js
```

komutu ile docker-compose içerisindeki veritabanını besleyebiliyoruz.

---

Bu işlem, MongoDB'yi gerekli rastgele veriler ile dolduracaktır.

## 3. 🛑 Orkestrasyonun kapatılması ve verilerin temizlenmesi

Konteyner orkestrasyonunu sonlandırıp verileri temizlemek için şu komutu kullanın:

```sh
docker-compose down -v
```


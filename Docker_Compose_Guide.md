# 🐳 Projenin Docker-Compose ile Başlatılması

Bu proje, Docker Compose kullanarak konteyner ortamında çalışabilmektedir. Aşağıdaki adımları takip ederek projeyi çalıştırabilirsiniz.

## 1. 🚀 Konteynerları Başlat

Proje ana dizininde aşağıdaki komut ile Docker Compose üzerinden gerekli servisleri çalıştırın:

```sh
docker-compose up --build
```

Bu işlem, `mongodb`, `server` ve `client` konteynerlarını başlatacaktır.

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


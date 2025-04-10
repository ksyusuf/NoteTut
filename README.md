# 📝 Not Uygulaması - DevOps Öğrenme Projesi

Bu proje, modern yazılım geliştirme süreçlerini ve DevOps pratiklerini öğrenmek isteyen geliştiriciler için hazırlanmış açık kaynaklı bir öğrenme projesidir. Temel amacı, gerçek dünya senaryolarında CI/CD (Sürekli Entegrasyon/Sürekli Dağıtım) süreçlerinin nasıl uygulandığını göstermek ve açık kaynak projelere katkıda bulunma deneyimini kazandırmaktır.

## 🎯 Proje Amacı

Basit bir not uygulaması üzerinden DevOps ekosistemininin öğrenilmesi hedeflenmektedir. Katılımcılar, projeye yeni özellikler ekleyerek veya mevcut yapıyı geliştirerek modern yazılım geliştirme süreçlerini deneyimleyebilirler.

- 🔄 **DevOps Pratiklerini Öğrenme**: Modern yazılım geliştirme süreçlerini, CI/CD pipeline'larını ve otomatik deployment süreçlerini pratik yaparak öğrenme
- 🤝 **Açık Kaynak Katkısı**: Gerçek bir projeye katkıda bulunma deneyimi kazanma
- 💻 **Profesyonel Geliştirme Ortamı**: Endüstri standardında geliştirme pratiklerini uygulama
- 👥 **İşbirliği ve Kod Review**: Takım çalışması ve kod review süreçlerini deneyimleme

## 🛠️ Teknik Detaylar

### 🎨 Frontend Teknolojileri
- ⚛️ **React.js**: Modern UI geliştirme
- 📘 **TypeScript**: Tip güvenliği ve kod kalitesi
- 🎨 **Tailwind CSS**: Hızlı ve modern UI tasarımı
- 🚀 **Vercel**: Frontend deployment ve hosting

### ⚙️ Backend Teknolojileri
- 🟢 **Node.js**: Server-side uygulama
- 🚂 **Express.js**: Web framework
- 🍃 **MongoDB**: NoSQL veritabanı
- 🦊 **Mongoose**: MongoDB ODM
- 🔐 **JWT**: Kimlik doğrulama

### 🔧 DevOps & Araçlar
- 🐳 **Docker**: Konteynerizasyon
- ⚡ **GitHub Actions**: CI/CD pipeline'ları
- 🚀 **Vercel**: Deployment ve hosting
- ✨ **ESLint & Prettier**: Kod kalitesi ve formatı
- 🧪 **Jest**: Test framework'ü

### 🎯 Katkıda Bulunabileceğiniz Alanlar
- 🎨 **Frontend Geliştirme**: UI/UX iyileştirmeleri, yeni özellikler
- ⚙️ **Backend Geliştirme**: API geliştirme, performans optimizasyonu
- 🔧 **DevOps**: CI/CD pipeline'ları, deployment süreçleri
- 🧪 **Test**: Unit testler, integration testler
- 📚 **Dokümantasyon**: Teknik dokümantasyon, kullanıcı kılavuzları

## 🔄 Servisler Arası Haberleşme

### 📡 API Endpoints

Backend servisi aşağıdaki REST API endpoint'lerini sunmaktadır:

#### Notlar (Notes)
- `GET /api/notes`: Tüm notları ve kategorileri getirir
- `POST /api/notes`: Yeni not ekler
- `GET /api/notes/:id`: ID'ye göre not getirir
- `PATCH /api/notes/:id`: Notu günceller
- `DELETE /api/notes/:id`: Notu siler

#### Veri Modelleri

##### Note (Not)
```json
{
  "header": "string",
  "content": "string",
  "category": "ObjectId", // ref: 'Category'
  "date": "Date"
}
```

##### Category (Kategori)
```json
{
  "name": "string"
}
```

### 🔌 Frontend-Backend İletişimi

Frontend servisi, backend API'si ile aşağıdaki şekilde haberleşir:

1. **API URL Yapılandırması**:
   - Frontend `REACT_APP_API_URL` ortam değişkeni ile backend URL'i tanımlanır
   - Development ortamında: `http://localhost:5000/`
   - Production ortamında: Vercel deployment URL'i

2. **Veri Akışı**:
   - Frontend, Redux store üzerinden state yönetimi yapar
   - API istekleri `fetch` API kullanılarak yapılır
   - CORS politikaları backend tarafından yönetilir

3. **Hata Yönetimi**:
   - API isteklerinde try-catch blokları kullanılır
   - Hata durumları kullanıcıya uygun şekilde gösterilir
   - Network hataları için fallback mekanizmaları mevcuttur

### 🔒 Güvenlik

- API istekleri için CORS politikaları uygulanmıştır
- Hassas bilgiler `.env` dosyalarında saklanır
- Production ortamında HTTPS zorunludur

# 📖 Geliştirici Dokümantasyonu

Projeye yeni özellik eklemek veya geliştirme yapmak için lütfen [Geliştirici Kılavuzu](DEVELOPER_GUIDE.md) dokümanını inceleyin.


### 🔄 CI/CD Pipeline

Projemizde dört ana workflow bulunmaktadır:

1. 🔍 **Pull Request Checks** (`pull-request.yml`):
   - Frontend ve backend testlerini çalıştırır
   - Build işlemlerini kontrol eder
   - PR'ların geçerliliğini doğrular
   - Main ve staging branch'lerine yapılan PR'ları kontrol eder

2. 🧪 **Staging Tests** (`staging.yml`):
   - Frontend testleri
   - Backend testleri
   - Lint kontrolleri
   - Tüm testlerin başarılı olduğunu doğrular

3. 🚀 **Frontend Deployment** (`frontend-deployment.yml`):
   - Main branch'e push yapıldığında tetiklenir
   - Vercel CLI kurulumu
   - Frontend build işlemi
   - Vercel üzerine production deployment
   - Custom domain ayarlaması (notetut.vercel.app)

4. ⚙️ **Backend Deployment** (`backend-deployment.yml`):
   - Main branch'e push yapıldığında tetiklenir
   - Vercel CLI kurulumu
   - Environment variables ayarlaması
   - Backend deployment
   - Custom domain ayarlaması (notetut-server.vercel.app)

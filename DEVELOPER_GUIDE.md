# 👨‍💻 Geliştirici Kılavuzu

## 🚀 Yeni Özellik Geliştirme Süreci

Bu dokümantasyon, projeye yeni özellik eklemek isteyen geliştiriciler için hazırlanmıştır.

### 🌳 Branch Stratejisi

- `main`: 🏭 Production ortamı için ana branch
- `staging`: 🧪 Test ve deployment öncesi kontroller için branch
- `feature/*`: ✨ Yeni özellikler için branch'ler
- `bugfix/*`: 🐛 Hata düzeltmeleri için branch'ler

### 1. 📥 Kodların Geliştirme Ortamına Alınması

```sh
# Projeyi klonlayın
git clone [repo-url]

# Proje dizinine gidin
cd [proje-dizini]
```

#### Manuel Geliştirme Ortamı
Alternatif olarak, servisleri ayrı ayrı çalıştırabilirsiniz:

```sh
# Server'ı başlatın
cd server
npm install
npm run dev

# Yeni bir terminal açın ve client'ı başlatın
cd client
npm install
npm run dev
```

#### Docker Compose ile Hızlı Başlangıç

Docker Compose ile servislerin kontrolü için [Docker Kılavuzu](Docker_Compose_Guide.md) dokümanını inceleyin.


### 2. 💻 Geliştirme Süreci

1. **🔄 Yeni Branch Oluşturma**
   ```sh
   git checkout -b feature/yeni-ozellik-adi
   ```

2. **👨‍ Geliştirme ve Test**
   - Yeni özelliğinizi geliştirin
   - Unit testlerinizi yazın (x)
   - Lokal ortamda testlerinizi çalıştırın
   - Kodunuzu lint kurallarına uygun hale getirin (x)

3. **📝 Değişiklikleri Commit Etme**
   ```sh
   git add .
   git commit -m "feat: yeni özellik açıklaması"
   ```

4. **🚀 Staging'e Push ve PR Açma**
   ```sh
   git push origin feature/yeni-ozellik-adi
   ```
   - GitHub üzerinden `staging` branch'ine PR açın
   - PR açıklamasında:
     - Yapılan değişiklikleri detaylı açıklayın
     - Test sonuçlarını ekleyin (x)
     - Varsa ekran görüntüleri ekleyin (x)

### 3. 👀 Code Review ve Deployment Süreci

1. Tüm testlerin başarılı olduğundan emin olun

2. Staging branch'ine PR açın

3. **Code Review Süreci**
   - Admin tarafından PR incelenecek
   - Gerekli düzeltmeler istenebilir
   - Tüm kontroller başarılı olmalı
   - Bu noktadan sonraki işlemler admin tarafından gerçekleştirilir

4. **Staging'e Merge**
   - PR onaylandıktan sonra staging'e merge edilir
   - Otomatik testler çalışır
   - Staging ortamında test edilir

5. Staging testleri başarılı olduktan sonra main branch'e PR açılır

6. **Production'a Deployment**
   - Staging'deki değişiklikler kontrol edilir
   - Staging -> Main branch'e merge edilir
   - Otomatik olarak production ortamına deploy edilir

### 4. ⚠️ Önemli Kurallar

- Main branch'e direkt push yapmayın
- Commit mesajlarınızı açıklayıcı yazın
- Her PR'da test verilerini ekleyin
- Staging testlerinden geçmeden main branch'e PR açmayın
- Test coverage'ını koruyun


### 5. 📌 Önemli Notlar

- Her zaman güncel `main` branch'inden yeni branch oluşturun
- Commit mesajlarınızı [Conventional Commits](https://www.conventionalcommits.org/) standardına uygun yazın
- Test coverage'ını koruyun ve yeni testler ekleyin
- PR açmadan önce tüm testlerin başarılı olduğundan emin olun
- Kod review sürecinde yapılan yorumları dikkate alın 
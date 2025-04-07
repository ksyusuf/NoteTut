# Docker Compose

    Her servis için (Frontend/Backend) Dockerfile'lar oluşturulur.
    Servislerin bulunduğu dizinde ise docker-compose.yml oluşturulur ve bu iki konteyner için konteynerizasyon oluşturulur (Container Orchestration).

- docker-compose up --build: Ana dizinde çalıştırarak sistmini lokalde ayağa kaldırabilirsin.

- docker-compose down --volume: Ana dizinde çalıştırarak konteynerizasyonunu tamamen sıfırlayarak silersin.

- docker-compose ile ayağa kaldırdığın yapının veritabanını beslemek için: docker-compose exec server npm run seed

# Testing

    Test işlemi jest çerçevesinde gerçekleşitiriliyor. Henüz sadece Frontend testleri mevcut. React Testing Library ile basit test denemeleri yapıldı ve entegre edildi.

- npm test: otomatik olarak testleri gerçekleştirir.

- npm test -watch: testleri izleme modunda yapar, her değişiklikte sadece kaydederek testi yineler.


# Deployment on Vercel with Github Acitons
    ❗Workflows vercel deployment yaptığın zaman iletişim kuracak servislerin için *vercel deployment protection* ayarını kapatmalısın. aksi takdirde cors hatası alıyorsun.❗

    Her servisi bağımsız olması açısından ayrı yapılandırma dosyaları ile barındırıyorum. vercel.json ile yapılandırma ayarlarını inceleyebilirsin.

## Workflows Variables

    Workflow içerisindeki ortam değişkenlerini 'vercel link' ile elde ediyorsun. Elde ettiğin değişkenleri
    github -> settings -> secrets and variables -> Actions
    kısmından eklemelisin.

Bir servis için elinde olması gereken değişkenler şunlardır;

* __VERCEL_TOKEN__: vercel hesap ayarlarına girip tokens kısmından üretip kaydedeceksin.

* __VERCEL_PROJECT_ID__: vercel link ile edineceksin.

* __VERCEL_ORG_ID__: vercel link ile edineceksin.

### vercel link
    Login olup çalışma yapacağın projeyi seçeceksin. mevcut projeni seçip ilerleyeceksin. yanlışlıkla yeni proje oluşturabilirsin. işlemler doğru yapılınca ilgili servisin olduğu dizinde .vercel->project.json oluşturacak ve onun içerisinde ilgili değişkenlerin olacak. bunlar github variables kısmına kaydedilir.

## Kurulan Workflow Yapısı
### Akış:
    A[Feature Branch] -->|PR| B[Staging Branch]
    B -->|Tests Pass| C[Main Branch]
    B -->|Use Staging Env| D[Staging Deployment]
    C -->|Use Production Env| E[Production Deployment]
---
    - main        # Production ortamı
    - staging     # Staging/Pre-production ortamı
    - development # Development ortamı
    - feature/*   # Özellik geliştirme branch'leri
   
---
    Her özellik ayrı branch ile gönderilir. Deployment branchine (varsa) PR atılır.
    ilk aşama kontrolleri/testleri burada yapılır.
    Deployment testleri tamamlandığında staging branche PR açılır ve production ortamı kontrolleri/testleri yapılır.
    staging branch kontrolleri sağlandıktan sonra main branch PR açılır,
    burada, deployment işlemleri gerçekleşir.

Mevcut proje içerisinde frontend ve backend projeleri barındırıldığı için deployment akışlşarı ayrı ayrı oluşturulmuştur.

    Her akışın bir tetiklenme ayarı vardır.
    Deployment akışları yalnızda main branch push işleminde gerçekleşmektedir.
    staging PR açılması durumunda production ortamı testleri gerçekleştirilir.
    development PR açılması durumunda development ortamı testleri gerçekleştirilir.
---
    Her branch için ilgili enviromentler hazırlanmalı ve proje içerisinde bu enviromentlerden okuma yapılacak modülerlik sağlanmalı. (Bizim projemin için genel olarak oluşturulmuş vaziyette -kontrol edilmeli-)


# Vercel Variables for Frontend/Backend Service

    İlgili servisleri vercel'e yükledikten sonra environment değişkenlerini ya da global değişkenlerini vercel proje ayarlarındaki Environment Variables kısmından eklemelesin.

-> Frontend için değişkenlerim:

* __REACT_APP_API_URL__: buraya api sağlayıcımın domainini girdim.

    isteğe/ihtiyaca ve olması gereken şekilde özelleştirebilirsin.

-> Backend için değişkenlerim:

* __MONGODB_URI__: MongoDB Atlas için kullanıcı adımı, şifremi ve veritabanı adımı belirttiğim ConnectionString değerim.


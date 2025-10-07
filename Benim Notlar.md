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


-> Frontend için değişkenlerim:

* __REACT_APP_API_URL__: buraya api sağlayıcımın domainini girdim.

    isteğe/ihtiyaca ve olması gereken şekilde özelleştirebilirsin.

-> Backend için değişkenlerim:

* __MONGODB_URI__: MongoDB Atlas için kullanıcı adımı, şifremi ve veritabanı adımı belirttiğim ConnectionString değerim.


const mongoose = require('mongoose');
const Note = require('./models/Note');  // Not modelini import ediyoruz
const Category = require('./models/Category');  // Kategori modelini import ediyoruz
require('dotenv').config();

// MongoDB bağlantı URI'si - Daha esnek ve güvenli bir yaklaşım
const getMongoURI = () => {
  // Önce environment variable'ı kontrol et
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  // Environment'a göre host seçimi
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : 'mongodb';
  const port = process.env.MONGODB_PORT || '27017';
  const dbName = process.env.MONGODB_DB_NAME || 'notlar';

  return `mongodb://${host}:${port}/${dbName}`;
};

let mongoURI = getMongoURI();
console.log('Connecting to MongoDB at:', mongoURI);

// MongoDB bağlantısı
mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // 5 saniye içinde bağlanamazsa hata ver
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Bağlantı hatası durumunda programı sonlandır
  });

// Rastgele veri oluşturma fonksiyonları
function getRandomHeader() {
  const headers = [
    'Meeting Notes',
    'Grocery List',
    'Project Plan',
    'To-Do List',
    'Reminder',
    'Event Summary',
    'Daily Journal',
    'Recipe Ideas',
    'Book Review',
    'Travel Plans'
  ];
  return headers[Math.floor(Math.random() * headers.length)];
}

function getRandomContent() {
  const contents = [
    'This is a note about something important.',
    "Don't forget to complete the task.",
    'This is a detailed description of a project.',
    'Remember to check these items.',
    'This is a reminder for the upcoming event.',
    "A summary of today's meeting.",
    'Items to buy at the grocery store.',
    'Plan for the next phase of the project.',
    'Thoughts on the book I just finished.',
    'Ideas for my next trip.'
  ];
  return contents[Math.floor(Math.random() * contents.length)];
}

function getRandomDate() {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Rastgele veriler ekleme
async function seedDatabase() {
  try {
    console.log('Veritabanı temizleniyor...');
    await Note.deleteMany({});
    await Category.deleteMany({});

    console.log('Kategoriler oluşturuluyor...');
    const categories = ['Work', 'Personal', 'Important', 'Miscellaneous', 'Family', 'Health', 'Travel'];
    const categoryDocs = await Category.insertMany(categories.map(name => ({ name })));
    
    console.log('Notlar oluşturuluyor...');
    const notes = [];
    for (let i = 0; i < 10; i++) {
      const randomCategory = categoryDocs[Math.floor(Math.random() * categoryDocs.length)];
      notes.push({
        header: getRandomHeader(),
        content: getRandomContent(),
        category: randomCategory._id,  // Kategori ID'si ile eşleştir
        date: getRandomDate()
      });
    }

    await Note.insertMany(notes);
    console.log('10 rastgele not ve kategoriler başarıyla eklendi.');
  } catch (err) {
    console.error('Veri ekleme hatası:', err);
    process.exit(1); // Hata durumunda process'i başarısız olarak sonlandır
  } finally {
    // await kullanarak, bağlantı tam olarak kapantıkdan sonra sonraki işlemlere geçer.
    await mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı.');
    process.exit(0); // Başarılı durumda process'i sonlandır
  }
}

// Seed işlemini başlat
console.log('Seed işlemi başlatılıyor...');
seedDatabase();

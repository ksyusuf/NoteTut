const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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

const mongoURI = getMongoURI();
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
    // Kritik bir hata olduğu için uygulamayı sonlandır
    process.exit(1);
  });

// CORS ayarları
const isDevelopment = process.env.NODE_ENV === 'development';
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = isDevelopment 
      ? ['http://localhost:3000', 'http://127.0.0.1:3000']
      : ['https://notetut.onrender.com'];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h2>Selamlar!</h2>');
});

// Notes
const noteRouter = require('./routes/notes');
// bu şekilde bir ana dizin altında yapılabilecek işlemlerin olduğu bir url oluşturduk.
app.use('/api/notes', noteRouter);
// bu dizinin ana erişim kısmını düzenledik
// bu dizin altındaki route'lara erişim sağlayıp işlem yapabileceğiz.

// Test Endpoint'i (Mutlaka ekleyin)
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', version: '1.0.0' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

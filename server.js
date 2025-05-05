import express from 'express';
import connectToMongoDb from './db/connectToMongoDb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import introRoutes from './routes/intro.routes.js'; // intro router
import aboutRoutes from './routes/about.routes.js'; // about router
import experienceRoutes from './routes/experience.routes.js'; // experience router
import portfolioRoute from './routes/portfolioRoute.js'; // intro router
import courseRoutes from './routes/course.routes.js'
import projectRoutes from './routes/project.routes.js'
import contactRoutes from './routes/contact.routes.js'
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // JSON middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL'si
  credentials: true, // Kimlik doğrulama için credentials'ı dahil et
}));

// Basit bir ana route
app.get('/', (req, res) => {
  res.send('Merhaba, Express Sunucusu!');
});

// API route'larını ekleyin
app.use('/api/intro', introRoutes); // intro için '/api/intro'
app.use('/api/about', aboutRoutes); // about için '/api/about'
app.use('/api/experience', experienceRoutes); // experience için '/api/experience'
app.use('/api/project', projectRoutes);
app.use('/api/course', courseRoutes); // experience için '/api/experience'
app.use('/api/contact', contactRoutes); 
app.use('/api/portfolio', portfolioRoute); // intro için '/api/intro'

// Sunucuyu başlatma fonksiyonu
const startServer = async () => {
  try {
    await connectToMongoDb(); // MongoDB'ye bağlan
    app.listen(port, () => {
      console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    });
  } catch (error) {
    console.error('Sunucu başlatma hatası:', error);
    process.exit(1); // Hata durumunda çıkış yap
  }
};

startServer();

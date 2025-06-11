import express from 'express';
import connectToMongoDb from './db/connectToMongoDb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import introRoutes from './routes/intro.routes.js';
import aboutRoutes from './routes/about.routes.js';
import experienceRoutes from './routes/experience.routes.js';
import portfolioRoute from './routes/portfolioRoute.js';
import courseRoutes from './routes/course.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';
import authRoute from './routes/auth.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const allowedOrigins = [
  'http://localhost:3000',
  process.env.CORS_ORIGIN
].filter(Boolean); // undefined/null değerleri listeden çıkarır

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error("CORS Error: Origin not allowed", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Merhaba, MERN Portfolyo Backend Sunucusu Çalışıyor!');
});

app.use('/api/intro', introRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/portfolio', portfolioRoute);
app.use('/api/auth', authRoute);

const startServer = async () => {
  try {
    await connectToMongoDb();
    app.listen(port, () => {
      console.log(`Sunucu ${process.env.NODE_ENV || 'development'} modunda port ${port} adresinde çalışıyor`);
      if (allowedOrigins.length > 0) {
        console.log(`CORS izin verilen origin(ler): ${allowedOrigins.join(', ')}`);
      } else {
        console.log(`CORS için izin verilen origin bulunamadı. Sadece tarayıcı dışı isteklere izin veriliyor olabilir.`);
      }
    });
  } catch (error) {
    console.error('Sunucu başlatma hatası:', error);
    process.exit(1);
  }
};

startServer();
import express from 'express';
import connectToMongoDb from './db/connectToMongoDb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import introRoutes from './routes/intro.routes.js'; // intro router
import aboutRoutes from './routes/about.routes.js'; // about router
import experienceRoutes from './routes/experience.routes.js'; // experience router
import portfolioRoute from './routes/portfolioRoute.js'; // intro router
import courseRoutes from './routes/course.routes.js'
import projectRoutes from './routes/project.routes.js'
import contactRoutes from './routes/contact.routes.js'
import authRoute from './routes/auth.routes.js'
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;


app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Merhaba, Express Sunucusu!');
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
      console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    });
  } catch (error) {
    console.error('Sunucu başlatma hatası:', error);
    process.exit(1); 
  }
};

startServer();

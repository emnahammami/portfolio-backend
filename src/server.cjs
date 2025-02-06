import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import projetRoutes from './routes/projets';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import timeout from 'connect-timeout';
const bodyParser = require('body-parser');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dcgvi2gxp',
  api_key: '565947912736894',
  api_secret: 'vLaAPc3hM_yCntpZ1iA0l9eEPvw',
});

dotenv.config();
const app = express();

app.use(cors());

// ⚡ Configure Multer for FormData
const storage = multer.memoryStorage(); // Store files in memory (you can change this)
app.use((req, res, next) => {
  req.setTimeout(600000);
  res.setTimeout(600000);
  next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Allow parsing of `multipart/form-data`
app.use(express.urlencoded({ extended: true}));
app.use(cors({
  origin: 'https://portfolio-pkf1l2swd-emnahammamis-projects.vercel.app/?fbclid=IwY2xjawIQuRhleHRuA2FlbQIxMAABHcbu0bXfUyQqq6NptoZC_y27zAn4X9cDnyK5hKp-on86goM2f-aawKWlqQ_aem_zxLuqvh3RGq8sEiE0cDp2g' // Or '*' to allow all origins
}));

app.use('/api/projets', projetRoutes);
 // Valeur très élevée en ms (~24 jours)
 app.use(timeout('30m'));  // Temps d'attente de 30 minutes (tu peux ajuster le temps ici)
 app.use(json());  // Middleware pour parser le JSON des requêtes
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI )
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

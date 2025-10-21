import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import projetRoutes from './routes/projets';
import certifsRoutes from './routes/certifs';

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import timeout from 'connect-timeout';
const bodyParser = require('body-parser');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dcgvi2gxp',
  api_key: process.env.CLOUDINARY_API_KEY || '565947912736894',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'vLaAPc3hM_yCntpZ1iA0l9eEPvw',
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
const allowedOrigins = [
  'http://localhost:3000',        // Dev frontend
  'http://portfolio-frontend-git-main-emnahammamis-projects.vercel.app',     // Prod frontend (removed trailing slash)
  'https://portfolio-frontend-git-main-emnahammamis-projects.vercel.app'     // HTTPS version
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// Routes
app.use('/api/certifs', certifsRoutes);
app.use('/api/projets', projetRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI ||"mongodb+srv://hammamiemna22:Puetxea3hfWAdvl6@cluster0.pthra.mongodb.net/")
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

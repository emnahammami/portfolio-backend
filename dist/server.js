"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const projets_1 = __importDefault(require("./routes/projets"));
const certifs_1 = __importDefault(require("./routes/certifs"));
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const bodyParser = require('body-parser');
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dcgvi2gxp',
    api_key: process.env.CLOUDINARY_API_KEY || '565947912736894',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'vLaAPc3hM_yCntpZ1iA0l9eEPvw',
});
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// ⚡ Configure Multer for FormData
const storage = multer_1.default.memoryStorage(); // Store files in memory (you can change this)
app.use((req, res, next) => {
    req.setTimeout(600000);
    res.setTimeout(600000);
    next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Allow parsing of `multipart/form-data`
app.use(express_1.default.urlencoded({ extended: true }));
const allowedOrigins = [
    'http://localhost:3000', // Dev frontend
    'http://portfolio-frontend-git-main-emnahammamis-projects.vercel.app', // Prod frontend (removed trailing slash)
    'https://portfolio-frontend-git-main-emnahammamis-projects.vercel.app' // HTTPS version
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// Routes
app.use('/api/certifs', certifs_1.default);
app.use('/api/projets', projets_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI || "mongodb+srv://hammamiemna22:Puetxea3hfWAdvl6@cluster0.pthra.mongodb.net/")
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ MongoDB Error:', err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const projets_1 = __importDefault(require("./routes/projets"));
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const connect_timeout_1 = __importDefault(require("connect-timeout"));
const bodyParser = require('body-parser');
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: 'dcgvi2gxp',
    api_key: '565947912736894',
    api_secret: 'vLaAPc3hM_yCntpZ1iA0l9eEPvw',
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
app.use('/api/projets', projets_1.default);
// Valeur très élevée en ms (~24 jours)
app.use((0, connect_timeout_1.default)('30m')); // Temps d'attente de 30 minutes (tu peux ajuster le temps ici)
app.use((0, express_1.json)()); // Middleware pour parser le JSON des requêtes
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ MongoDB Error:', err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

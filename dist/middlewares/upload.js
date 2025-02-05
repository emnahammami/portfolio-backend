"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideos = exports.uploadImages = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Storage engine configuration for multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // files will be stored in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const extname = path_1.default.extname(file.originalname);
        cb(null, Date.now() + extname); // unique filenames
    },
});
// Multer file upload setup for images
const uploadImages = (0, multer_1.default)({ storage }).array('images', 5); // Max 5 images
exports.uploadImages = uploadImages;
const uploadVideos = (0, multer_1.default)({ storage }).array('videos', 2); // Max 2 videos
exports.uploadVideos = uploadVideos;

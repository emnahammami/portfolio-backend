import multer from 'multer';
import path from 'path';

// Storage engine configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // files will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname); // unique filenames
  },
});

// Multer file upload setup for images
const uploadImages = multer({ storage }).array('images', 5); // Max 5 images
const uploadVideos = multer({ storage }).array('videos', 2); // Max 2 videos

export { uploadImages, uploadVideos };

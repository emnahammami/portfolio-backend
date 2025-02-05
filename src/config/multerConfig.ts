import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📂 Création du stockage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: isVideo ? "projects/videos" : "projects/images", // 📂 Stockage dans le bon dossier
      resource_type: isVideo ? "video" : "image", // 📹 Gérer images & vidéos
      format: isVideo ? "mp4" : "png", // 🎥 Convertir vidéos en MP4, images en PNG
      public_id: file.originalname.split(".")[0], // 🔤 Nom du fichier sans extension
    };
  },
});

const upload = multer({ storage ,  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
});

export default upload;

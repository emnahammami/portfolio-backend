import { Request, Response } from "express";
import { ICertificate, Certificate } from "../models/certificate";
import { v2 as cloudinary } from "cloudinary";

// Interface pour typer les fichiers reçus
interface MulterRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] } | undefined;
}

// Créer un certificat
export const createCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titre, organisme, dateObtention, lien } = req.body;

    if (!(req as any).files || !(req as any).files["images"]) {
      res.status(400).json({ error: "At least one image is required" });
      return;
    }

    const imageFiles = (req as any).files["images"];
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      const uploadResponse = await cloudinary.uploader.upload(file.path, {
        folder: "certificates/images",
        resource_type: "image",
      });
      imageUrls.push(uploadResponse.secure_url);
    }

    const newCertificate = new Certificate({
      titre,
      organisme,
      dateObtention,
      lien,
      images: imageUrls,
    });

    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error: any) {
    console.error("Error during certificate creation:", error);
    res.status(500).json({ error: error.message });
  }
};

// Lire tous les certificats
export const getCertificates = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching certificates...');
    const certificates: ICertificate[] = await Certificate.find();
    console.log(`Found ${certificates.length} certificates`);
    res.status(200).json(certificates);
  } catch (error: any) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un certificat
export const updateCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedData: any = { ...req.body };
    const files = (req as MulterRequest).files;

    if (files && files["images"]) {
      const imageFiles = files["images"];
      const imageUrls: string[] = [];

      for (const file of imageFiles) {
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
          folder: "certificates/images",
          resource_type: "image",
        });
        imageUrls.push(uploadResponse.secure_url);
      }

      updatedData.images = imageUrls;
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedCertificate) {
      res.status(404).json({ error: "Certificat non trouvé" });
      return;
    }

    res.status(200).json(updatedCertificate);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un certificat
export const deleteCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!deletedCertificate) {
      res.status(404).json({ error: "Certificat non trouvé" });
      return;
    }

    res.status(204).json();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

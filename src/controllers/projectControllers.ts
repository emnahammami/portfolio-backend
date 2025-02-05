import { Request, Response } from "express";
import { IProject, Project } from "../models/Projet";
import { v2 as cloudinary } from "cloudinary";

// Définir une interface pour typer les fichiers reçus par Multer
interface MulterRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] } | undefined;
}

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titre, description, technologies, lienCode } = req.body;

    // Vérifier si des fichiers ont été téléchargés
    if (!(req as any).files || !(req as any).files["images"]) {
      res.status(400).json({ error: "At least one image is required" });
      return;
    }

    const imageFiles = (req as any).files["images"]; // Récupérer les fichiers d'images

    // Tableau pour stocker les URLs des images
    const imageUrls: string[] = [];

    // Uploader chaque image sur Cloudinary
    for (const file of imageFiles) {
      const uploadResponse = await cloudinary.uploader.upload(file.path, {
        folder: "projects/images", // Stocker dans 'projects/images'
        resource_type: "image",
      });
      imageUrls.push(uploadResponse.secure_url); // Ajouter l'URL sécurisée au tableau
    }

    // Création du projet avec la liste d'images
    const newProject = new Project({
      titre,
      description,
      technologies: technologies ? technologies.split(",") : [],
      lienCode,
      images: imageUrls, // Stocker toutes les images
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error: any) {
    console.error("Error during project creation: ", error);
    res.status(500).json({ error: error.message });
  }
};


// Lire tous les projets
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects: IProject[] = await Project.find(); // Récupérer tous les projets
    res.status(200).json(projects); // Renvoi des projets
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un projet
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedData: any = { ...req.body };

    // Vérifier si des fichiers ont été uploadés pour mettre à jour les URLs des fichiers
    const files = (req as MulterRequest).files;

    if (files) {
      if (files["image"]) {
        const imageFile = files["image"][0];
        updatedData.image = imageFile.path; // URL de l'image depuis Cloudinary
      }
      if (files["video"]) {
        const videoFile = files["video"][0];
        updatedData.video = videoFile.path; // URL de la vidéo depuis Cloudinary
      }
    }

    // Mettre à jour le projet dans la base de données
    const updatedProject: IProject | null = await Project.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    // Vérifier si le projet a bien été trouvé
    if (!updatedProject) {
      res.status(404).json({ error: "Projet non trouvé" });
      return;
    }

    res.status(200).json(updatedProject); // Renvoi du projet mis à jour
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un projet
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    // Supprimer le projet de la base de données
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    // Vérifier si le projet a bien été supprimé
    if (!deletedProject) {
      res.status(404).json({ error: "Projet non trouvé" });
      return;
    }

    res.status(204).json(); // Confirmation de suppression
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

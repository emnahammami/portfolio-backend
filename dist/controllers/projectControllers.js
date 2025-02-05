"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjects = exports.createProject = void 0;
const Projet_1 = require("../models/Projet");
const cloudinary_1 = require("cloudinary");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titre, description, technologies, lienCode } = req.body;
        // Vérifier si des fichiers ont été téléchargés
        if (!req.files || !req.files["images"]) {
            res.status(400).json({ error: "At least one image is required" });
            return;
        }
        const imageFiles = req.files["images"]; // Récupérer les fichiers d'images
        // Tableau pour stocker les URLs des images
        const imageUrls = [];
        // Uploader chaque image sur Cloudinary
        for (const file of imageFiles) {
            const uploadResponse = yield cloudinary_1.v2.uploader.upload(file.path, {
                folder: "projects/images", // Stocker dans 'projects/images'
                resource_type: "image",
            });
            imageUrls.push(uploadResponse.secure_url); // Ajouter l'URL sécurisée au tableau
        }
        // Création du projet avec la liste d'images
        const newProject = new Projet_1.Project({
            titre,
            description,
            technologies: technologies ? technologies.split(",") : [],
            lienCode,
            images: imageUrls, // Stocker toutes les images
        });
        yield newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        console.error("Error during project creation: ", error);
        res.status(500).json({ error: error.message });
    }
});
exports.createProject = createProject;
// Lire tous les projets
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Projet_1.Project.find(); // Récupérer tous les projets
        res.status(200).json(projects); // Renvoi des projets
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjects = getProjects;
// Mettre à jour un projet
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = Object.assign({}, req.body);
        // Vérifier si des fichiers ont été uploadés pour mettre à jour les URLs des fichiers
        const files = req.files;
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
        const updatedProject = yield Projet_1.Project.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        // Vérifier si le projet a bien été trouvé
        if (!updatedProject) {
            res.status(404).json({ error: "Projet non trouvé" });
            return;
        }
        res.status(200).json(updatedProject); // Renvoi du projet mis à jour
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateProject = updateProject;
// Supprimer un projet
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Supprimer le projet de la base de données
        const deletedProject = yield Projet_1.Project.findByIdAndDelete(req.params.id);
        // Vérifier si le projet a bien été supprimé
        if (!deletedProject) {
            res.status(404).json({ error: "Projet non trouvé" });
            return;
        }
        res.status(204).json(); // Confirmation de suppression
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProject = deleteProject;

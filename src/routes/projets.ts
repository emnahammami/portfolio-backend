import express from "express";
import upload from "../config/multerConfig";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectControllers";

import {
  createCertificate,
  getCertificates,
  updateCertificate,
  deleteCertificate,
} from "../controllers/ceertificateControllers"; // Assure-toi que le nom du fichier est bien "certificateControllers.ts"

const router = express.Router();

// 📁 Projet routes
router.post(
  "/addProject",
  upload.fields([
    { name: "images", maxCount: 15 },
  ]),
  createProject
);

router.get("/getProjects", getProjects);

router.put(
  "/editProject/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateProject
);

router.delete("/deleteProject/:id", deleteProject);

// 🏆 Certificate routes
router.post(
  "/addCertificate",
  upload.fields([
    { name: "images", maxCount: 10 },
  ]),
  createCertificate
);

router.get("/getCertificates", getCertificates);

router.put(
  "/editCertificate/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
  ]),
  updateCertificate
);

router.delete("/deleteCertificate/:id", deleteCertificate);

export default router;

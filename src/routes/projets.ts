import express from "express";
import upload from "../config/multerConfig";
import { createProject, getProjects, updateProject, deleteProject } from "../controllers/projectControllers";

const router = express.Router();

// 📤 Upload images & vidéos via Cloudinary

router.post(
    "/addProject",
    upload.fields([
      { name: "images", maxCount: 15 }, // Accepter jusqu'à 5 images
    ]),
    createProject
  );
router.get("/getProjects", getProjects);
router.put("/editProject/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]), updateProject);
router.delete("/deleteProject/:id", deleteProject);

export default router;

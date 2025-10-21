"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const projectControllers_1 = require("../controllers/projectControllers");
const ceertificateControllers_1 = require("../controllers/ceertificateControllers"); // Assure-toi que le nom du fichier est bien "certificateControllers.ts"
const router = express_1.default.Router();
// 📁 Projet routes
router.post("/addProject", multerConfig_1.default.fields([
    { name: "images", maxCount: 15 },
]), projectControllers_1.createProject);
router.get("/getProjects", projectControllers_1.getProjects);
router.put("/editProject/:id", multerConfig_1.default.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
]), projectControllers_1.updateProject);
router.delete("/deleteProject/:id", projectControllers_1.deleteProject);
// 🏆 Certificate routes
router.post("/addCertificate", multerConfig_1.default.fields([
    { name: "images", maxCount: 10 },
]), ceertificateControllers_1.createCertificate);
router.get("/getCertificates", ceertificateControllers_1.getCertificates);
router.put("/editCertificate/:id", multerConfig_1.default.fields([
    { name: "images", maxCount: 10 },
]), ceertificateControllers_1.updateCertificate);
router.delete("/deleteCertificate/:id", ceertificateControllers_1.deleteCertificate);
exports.default = router;

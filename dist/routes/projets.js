"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const projectControllers_1 = require("../controllers/projectControllers");
const router = express_1.default.Router();
// 📤 Upload images & vidéos via Cloudinary
router.post("/addProject", multerConfig_1.default.fields([
    { name: "images", maxCount: 15 }, // Accepter jusqu'à 5 images
]), projectControllers_1.createProject);
router.get("/getProjects", projectControllers_1.getProjects);
router.put("/editProject/:id", multerConfig_1.default.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]), projectControllers_1.updateProject);
router.delete("/deleteProject/:id", projectControllers_1.deleteProject);
exports.default = router;

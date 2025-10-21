"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ceertificateControllers_1 = require("../controllers/ceertificateControllers");
const router = express_1.default.Router();
router.get("/getCertificates", ceertificateControllers_1.getCertificates);
exports.default = router;

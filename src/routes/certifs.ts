import express from "express";
import { getCertificates } from "../controllers/ceertificateControllers";

const router = express.Router();

router.get("/getCertificates", getCertificates);
export default router;

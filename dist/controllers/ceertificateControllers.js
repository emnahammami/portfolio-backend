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
exports.deleteCertificate = exports.updateCertificate = exports.getCertificates = exports.createCertificate = void 0;
const certificate_1 = require("../models/certificate");
const cloudinary_1 = require("cloudinary");
// Créer un certificat
const createCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titre, organisme, dateObtention, lien } = req.body;
        if (!req.files || !req.files["images"]) {
            res.status(400).json({ error: "At least one image is required" });
            return;
        }
        const imageFiles = req.files["images"];
        const imageUrls = [];
        for (const file of imageFiles) {
            const uploadResponse = yield cloudinary_1.v2.uploader.upload(file.path, {
                folder: "certificates/images",
                resource_type: "image",
            });
            imageUrls.push(uploadResponse.secure_url);
        }
        const newCertificate = new certificate_1.Certificate({
            titre,
            organisme,
            dateObtention,
            lien,
            images: imageUrls,
        });
        yield newCertificate.save();
        res.status(201).json(newCertificate);
    }
    catch (error) {
        console.error("Error during certificate creation:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.createCertificate = createCertificate;
// Lire tous les certificats
const getCertificates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching certificates...');
        const certificates = yield certificate_1.Certificate.find();
        console.log(`Found ${certificates.length} certificates`);
        res.status(200).json(certificates);
    }
    catch (error) {
        console.error('Error fetching certificates:', error);
        res.status(500).json({ error: error.message });
    }
});
exports.getCertificates = getCertificates;
// Mettre à jour un certificat
const updateCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = Object.assign({}, req.body);
        const files = req.files;
        if (files && files["images"]) {
            const imageFiles = files["images"];
            const imageUrls = [];
            for (const file of imageFiles) {
                const uploadResponse = yield cloudinary_1.v2.uploader.upload(file.path, {
                    folder: "certificates/images",
                    resource_type: "image",
                });
                imageUrls.push(uploadResponse.secure_url);
            }
            updatedData.images = imageUrls;
        }
        const updatedCertificate = yield certificate_1.Certificate.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedCertificate) {
            res.status(404).json({ error: "Certificat non trouvé" });
            return;
        }
        res.status(200).json(updatedCertificate);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateCertificate = updateCertificate;
// Supprimer un certificat
const deleteCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCertificate = yield certificate_1.Certificate.findByIdAndDelete(req.params.id);
        if (!deletedCertificate) {
            res.status(404).json({ error: "Certificat non trouvé" });
            return;
        }
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCertificate = deleteCertificate;

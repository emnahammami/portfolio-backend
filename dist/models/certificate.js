"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateModel = exports.Certificate = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Schema definition
const certificateSchema = new mongoose_1.Schema({
    titre: { type: String, required: true },
    organisme: { type: String, required: true },
    dateObtention: { type: Date, required: true },
    lien: { type: String, default: '' }, // optional
    images: { type: [String], required: true }, // Cloudinary URLs
});
// Mongoose model
exports.Certificate = mongoose_1.default.model('Certificate', certificateSchema);
// Class wrapper for Certificate
class CertificateModel {
    constructor(data) {
        this.titre = data.titre;
        this.organisme = data.organisme;
        this.dateObtention = data.dateObtention;
        this.lien = data.lien;
        this.images = data.images;
    }
    save() {
        return new exports.Certificate(this).save();
    }
}
exports.CertificateModel = CertificateModel;

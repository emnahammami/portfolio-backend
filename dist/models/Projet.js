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
exports.ProjectModel = exports.Project = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Defining the schema for the project with images as an array of strings
const projectSchema = new mongoose_1.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    lienCode: { type: String, default: '' },
    images: { type: [String], required: true }, // Now an array of image URLs
    video: { type: String },
});
// Creating the model
exports.Project = mongoose_1.default.model('Project', projectSchema);
// Class constructor for creating Project instances
class ProjectModel {
    constructor(data) {
        this.titre = data.titre;
        this.description = data.description;
        this.technologies = data.technologies;
        this.lienCode = data.lienCode;
        this.images = data.images;
        this.video = data.video;
    }
    save() {
        return new exports.Project(this).save();
    }
}
exports.ProjectModel = ProjectModel;

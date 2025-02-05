import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Project
export interface IProject extends Document {
  titre: string;
  description: string;
  technologies: string[];
  lienCode: string;
  images: string[]; // Now an array of image URLs
  video: string;
}

// Defining the schema for the project with images as an array of strings
const projectSchema: Schema = new Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  lienCode: { type: String, default: '' },
  images: { type: [String], required: true }, // Now an array of image URLs
  video: { type: String },
});

// Creating the model
export const Project = mongoose.model<IProject>('Project', projectSchema);

// Class constructor for creating Project instances
export class ProjectModel {
  titre: string;
  description: string;
  technologies: string[];
  lienCode: string;
  images: string[];
  video: string;

  constructor(data: IProject) {
    this.titre = data.titre;
    this.description = data.description;
    this.technologies = data.technologies;
    this.lienCode = data.lienCode;
    this.images = data.images;
    this.video = data.video;
  }

  save() {
    return new Project(this).save();
  }
}

import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Certificate
export interface ICertificate extends Document {
  titre: string;
  organisme: string;
  dateObtention: Date;
  lien: string; // link to the certificate (PDF or page)
  images: string[]; // Cloudinary URLs or other image hosting
}

// Schema definition
const certificateSchema: Schema = new Schema({
  titre: { type: String, required: true },
  organisme: { type: String, required: true },
  dateObtention: { type: Date, required: true },
  lien: { type: String, default: '' }, // optional
  images: { type: [String], required: true }, // Cloudinary URLs
});

// Mongoose model
export const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);

// Class wrapper for Certificate
export class CertificateModel {
  titre: string;
  organisme: string;
  dateObtention: Date;
  lien: string;
  images: string[];

  constructor(data: ICertificate) {
    this.titre = data.titre;
    this.organisme = data.organisme;
    this.dateObtention = data.dateObtention;
    this.lien = data.lien;
    this.images = data.images;
  }

  save() {
    return new Certificate(this).save();
  }
}

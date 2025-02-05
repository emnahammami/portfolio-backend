import { Request } from 'express';

declare global {
  namespace Express {
    interface Multer {
      File: File;  // Explicitly declare Multer File type here
    }
  }
}

export interface MulterRequest extends Request {
  files: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] | undefined;
}


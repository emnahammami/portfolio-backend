// src/types/custom.d.ts or directly in your src folder
import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      // Add any custom properties you need here for request
      user?: string; // example: adding user information to the request
    }
    interface Response {
      // You can also extend the response type if needed
      sendJSON: (statusCode: number, success: boolean, message: string, data?: any) => void;
    }
  }
}

  




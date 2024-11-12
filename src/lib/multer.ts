import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler, Request, Response } from "express";
import { IncomingMessage, ServerResponse } from "http";

const storage = multer.diskStorage({
  destination(req, file, callBack) {
    callBack(null, `public/assets/images`);
  },
  filename(req, file, callBack) {
    const timestamp = new Date().getTime(); 
    callBack(null, `${timestamp}${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1000 * 1000, // 5MB
  },
});

// export const runMiddleware = (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: Function
// ) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       resolve(result);
//     });
//   });
// };

// export const runMiddleware = (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: (req: NextApiRequest, res: NextApiResponse, callback: (result: unknown) => void) => void
// ) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: unknown) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       resolve(result);
//     });
//   });
// };

export const runMiddleware = (
  req: NextApiRequest | IncomingMessage, // Mengizinkan tipe NextApiRequest
  res: NextApiResponse | ServerResponse,  // Mengizinkan tipe NextApiResponse
  fn: RequestHandler
) => {
  return new Promise((resolve, reject) => {
    fn(req as Request, res as Response, (result: unknown) => { // Cast req dan res ke any
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
};

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string; // ini properti yang diakses
  path: string;
  size: number;
}

export interface NextApiRequestWithFile extends NextApiRequest {
  file?: MulterFile;
  files?: MulterFile[];
}

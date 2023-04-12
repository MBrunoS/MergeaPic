import multer from "multer";

const upload = multer();

export interface MulterRequest extends Express.Request {
  files?: any;
}

export const MulterMiddleware = upload.fields([
  { name: "overlay", maxCount: 1 },
  { name: "photos" },
]);

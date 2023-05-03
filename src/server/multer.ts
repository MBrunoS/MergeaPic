import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

const upload = multer();

export interface MulterRequest extends NextApiRequest {
  files?: any;
}

export const MulterMiddleware = upload.fields([
  { name: "overlay", maxCount: 1 },
  { name: "photos" },
]);

export function MulterValidator(
  req: MulterRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  if (!req.files) {
    res.status(400).send("Missing required files");
    return;
  }

  const overlay = req.files["overlay"]?.[0];

  if (!overlay) {
    res.status(400).send("Missing overlay file");
    return;
  }

  const photos = req.files["photos"];

  if (!photos) {
    res.status(400).send("Missing photo files");
    return;
  }

  next();
}

import { NextFunction, Response } from "express";
import { MulterRequest } from "./multer-middleware";

export function MulterValidator(
  req: MulterRequest,
  res: Response,
  next: NextFunction
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

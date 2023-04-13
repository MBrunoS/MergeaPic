import { Response } from "express";
import { mergeImages } from "./merge-images";
import { MulterRequest } from "./multer-middleware";

export const Controller = async (req: MulterRequest, res: Response) => {
  const overlay = req.files["overlay"][0];
  const photos = req.files["photos"];

  try {
    res.setHeader("Content-Type", "multipart/mixed; boundary=merged-image");

    const imagesIterator = mergeImages(overlay, photos);

    for await (const image of imagesIterator) {
      res.write("--merged-image\r\n");
      res.write("Content-Type: image/jpeg\r\n");
      res.write(`Content-Length: ${image.length}\r\n`);
      res.write("\r\n");
      res.write(image);
      res.write("\r\n");
    }

    res.write("--merged-image--\r\n");
  } catch (error: any) {
    res.statusCode = 400;
    res.write(error.message);
  }
  res.end();
};

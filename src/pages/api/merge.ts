import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import {
  MulterMiddleware,
  MulterRequest,
  MulterValidator,
} from "../../server/multer";
import { mergeImages } from "../../server/merge-images";

const handler = nextConnect<MulterRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry, something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})
  .use(MulterMiddleware)
  .use(MulterValidator)
  .post(async (req, res) => {
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
  });

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
    responseLimit: "50mb",
  },
};

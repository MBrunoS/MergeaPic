import express from "express";
import cors from "cors";
import multer from "multer";
import { mergeImages } from "./merge-images";

const app = express();
app.use(express.json());
app.use(cors());
const upload = multer();

interface MulterRequest extends Express.Request {
  files?: any;
}

const middleware = upload.fields([
  { name: "overlay", maxCount: 1 },
  { name: "photos" },
]);

app.post("/merge", middleware, async (req: MulterRequest, res) => {
  const overlay = req.files["overlay"][0];
  const photos = req.files["photos"];

  res.setHeader("Content-Type", "multipart/mixed; boundary=merged-image");

  for await (const image of mergeImages(overlay, photos)) {
    res.write("--merged-image\r\n");
    res.write("Content-Type: image/jpeg\r\n");
    res.write(`Content-Length: ${image.length}\r\n`);
    res.write("\r\n");
    res.write(image);
    res.write("\r\n");
  }

  res.write("--merged-image--\r\n");
  res.end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

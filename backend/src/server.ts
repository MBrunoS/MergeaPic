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
  {
    name: "overlay",
    maxCount: 1,
  },
  {
    name: "photos[]",
  },
]);

app.post("/merge", middleware, async (req: MulterRequest, res) => {
  const overlay = req.files["overlay"][0];
  const photos = req.files["photos[]"];

  const images = await mergeImages(overlay, photos);

  return res.json({ images });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

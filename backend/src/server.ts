import express from "express";
import cors from "cors";
import { MulterMiddleware } from "./multer-middleware";
import { Controller } from "./controller";

const app = express();
app.use(cors());

app.post("/merge", MulterMiddleware, Controller);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from "express";
import cors from "cors";
import { MulterMiddleware } from "./multer-middleware";
import { Controller } from "./controller";
import { MulterValidator } from "./multer-validator";

const app = express();
app.use(cors());

app.post("/merge", MulterMiddleware, MulterValidator, Controller);

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

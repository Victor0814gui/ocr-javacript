import { Router } from "express";
import fs from "fs";
import path from "path";
import { convertImageInText } from "../utils/convertImageInText";

export const convertImageInTextRoute = Router();

convertImageInTextRoute.get("/file", async (req, res) => {
  fs.readdir("uploads/precess/", async (err, files) => {
    if (err) {
      console.error('Error ao ler o directory:', err);
      return;
    }

    for (const file of files) {
      const filePath = path.join("uploads/precess/", file);

      if (fs.statSync(filePath).isFile()) {
        await convertImageInText(file);
      }
    }

    res.send('Processamento concluído');
  });
});

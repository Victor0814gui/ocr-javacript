import { Router } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { orientationCorrection } from "../utils/orientation";


export const readImage = Router();

readImage.get("/image", async (req, res) => {

  fs.readdir("uploads/image/", (err, files) => {
    if (err) {
      console.error('Error ao ler o directory:', err);
      return;
    }

    const filterFiles = files.filter(file =>
      fs.statSync(path.join("uploads/image/", file)).isFile()
    );

    filterFiles.forEach(async file => {
      orientationCorrection(file)

    });
  })
  return res.send()
})

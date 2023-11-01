import sharp from "sharp";
import { tratarArquivo } from "./tratar-file";

const fs = require('fs');
const ExifParser = require('exif-parser');



export async function orientationCorrection(inputPath: string) {

  fs.readFile(`uploads/image/${inputPath}`, (err: any, data: any) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }

    const parser = ExifParser.create(data);
    const result = parser.parse();

    const orientation = result.tags.Orientation;

    switch (orientation) {
      case 1:
        // console.log('Orientação correta (normal)' + inputPath);
        tratarArquivo(inputPath, 90)
        break;
      case 3:
        // console.log('Orientação invertida (180 graus)' + inputPath);
        tratarArquivo(inputPath, -270);
        break;
      case 6:
        // console.log('Orientação invertida (90 graus no sentido horário)' + inputPath);
        tratarArquivo(inputPath, 90);
        break;
      case 8:
        // console.log('Orientação invertida (90 graus no sentido anti-horário)' + inputPath);
        tratarArquivo(inputPath, 90);
        break;
      default:
        console.log('Orientação desconhecida' + inputPath);
    }
  });

}
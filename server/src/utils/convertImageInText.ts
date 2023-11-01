import { createWorker } from "tesseract.js";
import fs from "fs";

export async function convertImageInText(pathName: string) {
  const worker = await createWorker('eng');

  const data = await worker.recognize(
    `uploads/precess/${pathName}`,
  );

  const writeStream = fs.createWriteStream(`texts/${pathName}.txt`);

  writeStream.write(data.data.text.toString(), () => {
    console.log('Arquivo escrito com sucesso!');
    writeStream.end();
  });

  await worker.terminate();
}

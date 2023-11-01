import sharp from "sharp";






export async function tratarArquivo(inputPath: string, orientation: number) {
  await sharp(`uploads/image/${inputPath}`)
    .greyscale()
    .threshold(120)
    .rotate(orientation)
    .normalize()
    .median(3)
    .sharpen()
    .webp({ quality: 100 })
    .toFile(`uploads/precess/${inputPath}`)

}
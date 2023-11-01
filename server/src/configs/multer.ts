import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/image/'); // Define o diretório de destino dos uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '_' + uniqueSuffix + '.png'); // Define o nome do arquivo
  }
});


export const upload = multer({
  dest: 'uploads/image',
  storage,
});
import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";


import { upload } from "./configs/multer";
import { readImage } from "./services/readImage";
import { convertImageInTextRoute } from "./services/convertImageInText";

const app = express();
export const httpServer = createServer(app);
export const io = new Server(httpServer, { /* options */ });

app.use(express.json());
app.use(cors());

app.use(readImage)
app.use(convertImageInTextRoute)

app.post('/multipart-upload', upload.single("photo"), (req, res) => {
  // You can access other HTTP parameters. They are located in the body object.
  console.log(req.body);
  res.end('OK');
});

app.post('/files-upload', upload.array('photo', 140), (req, res) => {
  // You can access other HTTP parameters. They are located in the body object.
  console.log(req.body);
  res.end('OK');
});


io.on("connection", (socket) => {
  console.log(socket.id)
});

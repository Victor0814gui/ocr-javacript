import "dotenv";
import { httpServer } from "./http";

const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
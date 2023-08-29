import dotenv from "dotenv";
dotenv.config();

import server from "./src/app.js"
import { logger } from "./src/middlewares/loggers/logger.js"
const PORT = process.env.PORT || 8888;

server.listen(PORT, async () => {
  logger.info(`server running on port ${PORT}`);
});


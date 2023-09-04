import dotenv from "dotenv";
dotenv.config();

import server from "./src/app.js";
import { logger } from "./src/middlewares/loggers/logger.js";
const PORT = process.env.PORT || 8888;

import { dbCon } from "./src/config/db.js";

server.listen(PORT, async () => {
  try {
    logger.info(await dbCon(process.env.DB_URI));
    logger.info(`server running on port ${PORT}`);
  } catch (error) {
    logger.error(error);
  }
});

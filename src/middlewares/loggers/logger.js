import path from "path";
import { fileURLToPath } from "url";
import winston from "winston";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a Winston logger instance
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs", "alllogs.log"),
    }),
  ],
});

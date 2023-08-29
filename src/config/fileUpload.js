import path from "path";
import multer from "multer";
import fs from "fs";
import { logger } from "../middlewares/loggers/logger.js";
import { fileURLToPath } from "url"; // Import fileURLToPath

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//// Create a folder
export const createUploadFolder = (req, res, next) => {
  try {
    const publicFolderPath = path.join(__dirname, "..", "public");
    const uploadsFolderPath = path.join(publicFolderPath, "uploads");
    // Check if the "public" folder exists
    if (!fs.existsSync(publicFolderPath)) {
      fs.mkdirSync(publicFolderPath);
    }
    // Check if the "uploads" folder exists within the "public" folder
    if (!fs.existsSync(uploadsFolderPath)) {
      fs.mkdirSync(uploadsFolderPath);
    }
    next();
  } catch (error) {
    logger.error(error.message);
    res.send(error);
  }
};

/// File Type Validation...
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");
    if (isValid) {
      uploadError = null;
    }
    const uploadFilesPath = path.join(__dirname, "..", "public/uploads");
    cb(uploadError, uploadFilesPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

export const uploadOptions = multer({ storage: storage });

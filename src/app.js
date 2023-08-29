import dotenv from "dotenv";
dotenv.config();

import http from "http"
import express from "express";
const app = express();
const server = http.createServer(app)

import bodyParser from "body-parser";
import cors from "cors";

import { API_URL } from "./utils/API.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/// static..
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.join(__dirname, "public/uploads");
app.use("/public/uploads", express.static(staticPath));

/// jwt handler
import { authJwt } from "./helpers/jwt.js";
app.use(authJwt());

/// error handler
import { errorHandler } from "./helpers/error-handler.js";
app.use(errorHandler);

import { logger } from "./middlewares/loggers/logger.js";
import { errorLog, infoLog } from "./middlewares/loggers/loggers-handler.js";
app.use([errorLog, infoLog]);

// db connection
import mongoose from "mongoose";
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    logger.info(`db connected`);
  })
  .catch((error) => {
    logger.error(error);
    process.exit();
  });
// routes...
import categoriesRoutes from "./routers/categories.js";
import productsRoutes from "./routers/products.js";
import usersRoutes from "./routers/users.js";
import ordersRoutes from "./routers/orders.js";

// cors..
app.use(cors());
app.options("*", cors());

// http://localhost:8855/api/v1
app.use(`${API_URL}/categories`, categoriesRoutes);
app.use(`${API_URL}/products`, productsRoutes);
app.use(`${API_URL}/users`, usersRoutes);
app.use(`${API_URL}/orders`, ordersRoutes);

export default server;

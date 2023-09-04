import dotenv from "dotenv";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { API_URL } from "./utils/API.js";
import { errorHandler } from "./helpers/error-handler.js";
import { errorLog, infoLog } from "./middlewares/loggers/loggers-handler.js";
import { jsonVerify } from "./helpers/jwt.js"
import categoriesRoutes from "./routers/categories.js";
import productsRoutes from "./routers/products.js";
import usersRoutes from "./routers/users.js";
import ordersRoutes from "./routers/orders.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/// static..
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, "/public/uploads");
app.use("/public/uploads", express.static(staticPath));
/// error handler
app.use(errorHandler);
app.use([errorLog, infoLog]);
// cors..
app.use(cors());
app.options("*", cors());
// http://localhost:8855/api/v1
app.use(`${API_URL}/categories`, categoriesRoutes);
app.use(`${API_URL}/products`, productsRoutes);
app.use(`${API_URL}/users`, usersRoutes);
app.use(`${API_URL}/orders`,jsonVerify, ordersRoutes);

export default server;


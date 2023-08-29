import { logger } from "../middlewares/loggers/logger.js";
import { Order } from "../modules/order.js";
import { OrderItem } from "../modules/order-item.js";

import {
  ordersDELET,
  ordersGET,
  ordersGETBYID,
  ordersGetCount,
  ordersPUT,
  ordersTotalSales,
  userordersBYID,
  ordersPOST,
} from "../controllers/orders.js";

import express from "express";
const router = express.Router();

/// GET http://localhost:8855/api/v1/orders  # Done .
router.get("/", ordersGET);

/// GET http://localhost:8855/api/v1/orders/:id7654  # Done .
router.get("/:id", ordersGETBYID);

/// POST http://localhost:8855/api/v1/orders  # Done .
router.post("/", ordersPOST);

/// PUT http://localhost:8855/api/v1/orders/:id12345678  # Done .
router.put("/:id", ordersPUT);

/// DELETE http://localhost:8855/api/v1/orders/ID_9876543  # Done .
router.delete("/:id", ordersDELET);

/// GET http://localhost:8855/api/v1/orders/get/totalsales  # Done
router.get("/get/totalsales", ordersTotalSales);

/// GET http://localhost:8855/api/v1/orders/get/count  # Done .
router.get("/get/count", ordersGetCount);

/// GET http://localhost:8855/api/v1/orders/get/userorders/:userid1234567890  # Done .
router.get("/get/userorders/:userid", userordersBYID);

export default router;
